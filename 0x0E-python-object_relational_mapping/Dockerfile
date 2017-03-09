FROM sameersbn/mysql:latest
RUN apt-get update && apt-get install -y \
	python3-pip \
	python3-dev \
	libmysqlclient-dev \
	gcc
RUN pip3 install mysqlclient
RUN pip3 install SQLAlchemy
