pipeline {
    agent { label 'web-node' }

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
                rsync -av --delete ./ /home/ubuntu/app/
                '''
            }
        }
    }
}
