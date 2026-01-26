pipeline {
    agent { label 'webserver' }

    environment {
        APP_NAME = "node-app"
        DOCKER_IMAGE = "node-app-image"
        EC2_USER = "ubuntu"
        EC2_HOST = "15.185.151.186"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/USERNAME/REPO_NAME.git'
            }
        }

        stage('Install Docker (if not exists)') {
            steps {
                sh '''
                if ! command -v docker >/dev/null 2>&1; then
                  echo "Docker not found. Installing..."
                  sudo apt-get update
                  sudo apt-get install -y docker.io
                  sudo systemctl start docker
                  sudo systemctl enable docker
                  sudo usermod -aG docker jenkins
                else
                  echo "Docker already installed"
                fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop $APP_NAME || true
                docker rm $APP_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                docker run -d \
                --name $APP_NAME \
                -p 80:3000 \
                $DOCKER_IMAGE
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
