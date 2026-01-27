pipeline {
  agent any

  triggers { githubPush() }

  environment {
    APP_VERSION = "v${BUILD_NUMBER}"
    IMAGE_NAME = "saqib1devops/devops-dashboard"
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
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh """
            #!/bin/bash
            set -e
            echo \$PASS | docker login -u \$USER --password-stdin
          """
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
          docker run -d -p 82:3000 --name devops-app ${IMAGE_NAME}:${APP_VERSION}
        """
      }
    }
  }
}
