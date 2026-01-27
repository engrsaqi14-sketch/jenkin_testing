pipeline {
  agent any

  triggers { githubPush() }

  environment {
    APP_VERSION = "v${BUILD_NUMBER}"
    APP_ENV = "production"
    BUILD_TIME = sh(script: "date", returnStdout: true).trim()
    IMAGE_NAME = "yourdockerhubusername/devops-dashboard"
  }

  stages {
    stage("Checkout") {
      steps { checkout scm }
    }

    stage("Build") {
      steps { sh "docker build -t ${IMAGE_NAME}:${APP_VERSION} ." }
    }

    stage("Docker Login") {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'saqib1devops', passwordVariable: 'engr.saqi14')]) {
          sh "echo $PASS | docker login -u $USER --password-stdin"
        }
      }
    }

    stage("Push") {
      steps { sh "docker push ${IMAGE_NAME}:${APP_VERSION}" }
    }

    stage("Deploy") {
      steps {
        sh """
        docker rm -f devops-app || true
        docker run -d -p 82:3000 \
          -e APP_VERSION=${APP_VERSION} \
          -e APP_ENV=${APP_ENV} \
          -e BUILD_TIME="${BUILD_TIME}" \
          --name devops-app \
          ${IMAGE_NAME}:${APP_VERSION}
        """
      }
    }
  }
}
