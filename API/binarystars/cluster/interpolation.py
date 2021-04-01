import numpy as np
from binarystars.models import BinaryStars, Attribute
from django.db.models import Count


def interpolate(xp, fp, num_wanted):
    xp_prime = []
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
    all_objects = bss.all()
    rows = bss.values('id', 'file_id').annotate(rowcount=Count('id'))
    row_counts = rows.order_by('-rowcount')
    num_wanted = row_counts[0]['rowcount']

    result = []

    for star in row_counts:
        fp = []
        xp = [i for i in range(1, star['rowcount'] + 1)]
        interpolated = []

        starid = star['id']
        starfile = star['file_id']
        starlist = bss.filter(id=starid, file_id=starfile).order_by('id')
        all_att_strings = [str(att) for att in starlist[0].__dict__]

        for att in all_att_strings:
            current_att = []
            for s in starlist:
                current_att.append(getattr(s, str(att)))
            fp.append(current_att)
        
        for f in fp:
            interpolated.append(interpolate(xp, f, num_wanted))

        transposed_interpolated = np.array(interpolated).transpose()

        for t in transposed_interpolated:
            new_star = BinaryStars()
            for count, s in enumerate(all_att_strings):
                setattr(new_star, s, t[count])
            result.append(new_star)
    
    test = result[0]
    print(str(test))


if __name__ == '__main__':

    bss = BinaryStars.objects
    bss = BinaryStars.objects.values('id').annotate(rowcount=Count('id'))

    print(str(bss))

    xp = [1, 2, 3]
    fp = [0.5, 1, 2]
    num_wanted = 21
    
    # result = interpolate(xp, fp, num_wanted)
    # print(str(result))

    


    




