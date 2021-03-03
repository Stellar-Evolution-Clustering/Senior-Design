FROM python:3
copy . /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN cd /app && pip install -r requirements.txt
EXPOSE 8000
CMD python ./app/manage.py runserver 0.0.0.0:8000