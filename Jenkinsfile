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
        checkout(scm)
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
      when {
        branch 'master'
      }
      steps{
        container('go'){
          withCredentials([usernamePassword(passwordVariable : 'DOCKER_PASSWORD' ,usernameVariable : 'DOCKER_USERNAME' ,credentialsId : "$DOCKERHUB_CREDENTIAL_ID" ,)]) {
            sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
          }
          sh '''docker tag kubespheredev/nodejs-4-centos7 kubespheredev/nodejs-4-centos7:2.1.0
docker tag kubespheredev/nodejs-6-centos7 kubespheredev/nodejs-6-centos7:2.1.0
docker tag kubespheredev/nodejs-8-centos7 kubespheredev/nodejs-8-centos7:2.1.0
'''
          sh 'docker push kubespheredev/nodejs-4-centos7'
          sh 'docker push kubespheredev/nodejs-6-centos7'
          sh 'docker push kubespheredev/nodejs-8-centos7'
        }
      }
    }
  }
}
