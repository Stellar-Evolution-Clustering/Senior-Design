FROM python:3
copy . /app
RUN cd /app && pip install -r requirements.txt
CMD python ./app/manage.py runserver