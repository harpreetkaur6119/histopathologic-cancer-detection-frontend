# Histopathologic Cancer Detection Frontend App
Cancer is a disease in which cells are developed abnormally and they divide uncontrollably. This in turn has the ability to infiltrate and destroy normal body tissue. If detected early, it is highly treatable.

Deep learning in the field of image processing has shown exceptional results. The aim of this project is to do histopathologic cancer detection using Convolutional Neural Networks (CNN) and transfer learning. The goal is to create such a model that it can detect from a scan if the cancer tissue is found or not in the image, so that it is detected and appropriate medical treatment can be provided for its cure.

TensorFlow library is used for the deep learning. In this project, we will be using various CNN models such as Xception, VGG16 and resnet-50 Convolutional Neural Network (CNN). This will help us in concluding the best model for our use case.

![Screenshot 2023-08-13 162324](https://github.com/harpreetkaur6119/histopathologic-cancer-detection-frontend/assets/64327716/946fcdb7-49b8-43b0-8c5b-1ec011adf8ef)



# Install the necessary packages
npm i

# To Run
npm start

# Creating Docker Image
docker build -t pathology_frontend:1.0 .

# To Run Docker Image
docker run -d --name frontend --restart on-failure -p 80:3000 pathology_frontend:1.0
