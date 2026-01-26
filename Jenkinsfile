pipeline {
    agent { label 'webserver' }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t node-app-image .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop node-app || true
                docker rm node-app || true
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker run -d \
                --name node-app \
                -p 80:3000 \
                node-app-image
                '''
            }
        }
    }
}
