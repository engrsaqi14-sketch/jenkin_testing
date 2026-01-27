pipeline {
  agent any

  triggers {
    githubPush()
  }

  environment {
    APP_VERSION = "v${BUILD_NUMBER}"
    APP_ENV = "production"
    BUILD_TIME = sh(script: "date", returnStdout: true).trim()
    IMAGE_NAME = "yourdockerhubusername/devops-dashboard"
  }

  stages {
    stage("Checkout Source Code") {
      steps {
        checkout scm
      }
    }

    stage("Build Docker Image") {
      steps {
        sh "docker build -t ${IMAGE_NAME}:${APP_VERSION} ."
      }
    }

    stage("Push Image") {
      steps {
        sh "docker push ${IMAGE_NAME}:${APP_VERSION}"
      }
    }

    stage("Deploy Container") {
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
