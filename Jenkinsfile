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
                cd
                cd app/
                touch checking-automation_jenkins
                '''
            }
        }
    }
}



