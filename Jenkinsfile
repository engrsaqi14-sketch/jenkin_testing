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
                cd ~/app
                mkdir ~/saqib-jenkin-check
                if [ ! -d .git ]; then
                  git clone https://github.com/<username>/<repo>.git .
                else
                  git pull origin main
                fi
                '''
            }
        }
    }
}
