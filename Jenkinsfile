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
                pwd
                ls -la
                echo "Deploying from Jenkins workspace"
                '''
            }
        }
    }
}



