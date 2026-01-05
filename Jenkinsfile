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
                cd ~/saqib-jenkin-check
                nano file_pro
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
