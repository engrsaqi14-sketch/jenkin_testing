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
                if [ $(docker ps -q -f name=node-app) ]; then
                docker stop node-app
                docker rm node-app
                fi
                '''
                }
        }

        stage('Deploy Container') {
            steps {
                sh '''
                docker run -d \
                --name node-app \
                -p 82:3000 \
                node-app-image
                '''
            }
        }
    }
}
