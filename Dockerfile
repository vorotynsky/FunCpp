FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt

COPY ./manage.py ./
COPY ./MoocherAlerts ./MoocherAlerts
COPY ./moocher_page ./moocher_page
COPY ./money ./money

RUN python ./manage.py migrate