pipeline {
    agent { label 'webserver' }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                mkdir -p /home/ubuntu/app
                '''
            }
        }
    }
}
