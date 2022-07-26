FROM python:3.10

WORKDIR /usr/src/app

# Add project files
COPY . .

# Show versions. Need to be Python 3.6
RUN pip install --upgrade pip
RUN pip --version
RUN python --version

# Install requirements
RUN pip install -r requirements.txt


# Execute
CMD [ "python", "./main.py" ]