pipeline {
  agent {
    node {
      label 'go'
    }

  }
   environment {
     DOCKERHUB_CREDENTIAL_ID = 'dockerhub-id'
   }
  stages {
    stage('checkout scm ') {
      steps {
        git(url: 'https://github.com/kubesphere/s2i-nodejs-container', changelog: true, poll: false)
      }
    }
    stage('prepare') {
      steps {
        container('go') {
          sh 'go get github.com/cpuguy83/go-md2man'
          sh 'yum install distgen -y'
        }

      }
    }
    stage('nodejs4 test') {
      steps {
        container('go') {
          sh '''git submodule update --init
make VERSIONS="4" BASE_IMAGE_NAME="nodejs" test'''
        }

      }
    }
    stage('nodejs6 test') {
      steps {
        container('go') {
          sh '''git submodule update --init
make VERSIONS="6" BASE_IMAGE_NAME="nodejs" test'''
        }

      }
    }
    stage('nodejs8 test') {
      steps {
        container('go') {
          sh '''git submodule update --init
make VERSIONS="8" BASE_IMAGE_NAME="nodejs" test'''
        }

      }
    }
    stage('push to dockerhub'){
      steps{
        container('go'){
          withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKERHUB_CREDENTIAL_ID" ,)]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
          }
          sh 'docker push kubespheredev/nodejs-4-centos7'
          sh 'docker push kubespheredev/nodejs-6-centos7'
          sh 'docker push kubespheredev/nodejs-8-centos7'
        }
      }
    }
  }
}
