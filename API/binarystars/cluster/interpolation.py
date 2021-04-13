import numpy as np
from binarystars.models import InterpolatedBinaryStars, BinaryStars
from django.db.models import Count


def interpolate(xp, fp, num_wanted):
    xp_prime = []
    if num_wanted == len(xp): # this star has equal amount of rows as the star with the most amount of rows
        return fp # don't need to interpolate then
    div = num_wanted / len(xp)

    for i in xp:
        if i == xp[0]:
            xp_prime.append(1)
            continue
        
        if i == xp[-1]:
            xp_prime.append(num_wanted)
            continue

        new = i * div
        rounded = round(new)
        xp_prime.append(rounded)
    
    x = [i for i in range(1, num_wanted + 1)]
    result = np.interp(x, xp_prime, fp)
    return result

def interpolate_all():
    bss = BinaryStars.objects
    rows = bss.values('id', 'file_id').annotate(rowcount=Count('id'))
    row_counts = rows.order_by('-rowcount')
    num_wanted = row_counts[0]['rowcount']

    int_cols = ['file_id', 'id', 'kstar_1', 'kstar_2', 'sn_1', 'sn_2', 'bin_state', 'merger_type', 'bin_num']
    
    # result = []
    total_time_id = 1
    for star in row_counts:
        xp = [i for i in range(1, star['rowcount'] + 1)]
        # interpolated = []
        # fp = []
        
        starid = star['id']
        starfile = star['file_id']
        starlist = bss.filter(id=starid, file_id=starfile).order_by('id')
        all_att_strings = [str(att) for att in starlist[0].__dict__ if att != "_state"]

        fp = [[float(getattr(s, att)) for s in starlist] for att in all_att_strings]
        
        # for att in all_att_strings:
        #     current_att = []
        #     for s in starlist:
        #         current_att.append(float(getattr(s, str(att))))
        #     fp.append(current_att)
        
        # for f in fp:
        #     interpolated.append(interpolate(xp, f, num_wanted))
        
        interpolated = [interpolate(xp, f, num_wanted) for f in fp]
        
        transposed_interpolated = np.array(interpolated).transpose()
        internal_time = 0
        result = []
        for t in transposed_interpolated:
            new_star = InterpolatedBinaryStars()
            time_id = total_time_id + internal_time
            
            for count, s in enumerate(all_att_strings):
                if s == 'time_id':
                    setattr(new_star, s, time_id)
                elif s in int_cols:
                    setattr(new_star, s, int(t[count]))
                else:
                    setattr(new_star, s, t[count])
            result.append(new_star)
            internal_time += 1
        
        total_time_id += internal_time
        _ = InterpolatedBinaryStars.objects.bulk_create(result)
        # why not this... should be faster. Writing less data to db at a time...
    
    # _ = InterpolatedBinaryStars.objects.bulk_create(result) # instead of this...?