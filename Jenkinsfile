updateGitlabCommitStatus state: 'pending'

pipeline {
    // Makes our pipeline run on any node
    // agent any
    agent {
        label 'master'
    }

    options {
        gitLabConnection('gitlab')
    }

    environment {
        GOOGLE_APPLICATION_CREDENTIALS = '/root/key.json'
        KUBECONFIG = '/root/.kube/kubeconfig.yaml'
        CI = 'true'
    }
    
    stages  {
        stage('Build') {
            steps {
                sh 'npm build'
            }
        }

        stage('test') {
            steps {
                script {
                    try {
                        sh 'npm install'
                        sh 'npm run test'
                        updateGitlabCommitStatus name: 'Test', state: 'success'
                    } catch (exec) {
                        updateGitlabCommitStatus name: 'Test Failed', state: 'failed'
                        throw exec
                    }
                }
            }
        }

        stage("merge-code") {
            when {
                expression {
                    return  env.GIT_BRANCH != 'origin/develop'
                }
            }
            steps {
                acceptGitLabMR()
            }
        }

        stage("build-image") {
            when {
                expression {
                    return env.GIT_BRANCH == 'origin/develop'
                }
            }
            steps {
                sh 'docker build . -t enablementprojects/photon-ui:latest'
            }
        }

        stage("push-image") {
            when {
                expression {
                    return env.GIT_BRANCH == 'origin/develop'
                }
            }
            steps {
                sh 'docker push enablementprojects/photon-ui'
            }
 	    }

        stage("deploy-image") {
            when {
                expression {
                    return env.GIT_BRANCH == 'origin/develop'
                }
            }
            steps {
                sh 'kubectl rollout restart deployment/photon-ui --namespace=Team-Photon'
            }
         }
    }

    post {
        always {
            // Cleans the workspace - so Jenkins will run fast and efficiently
            cleanWs()
        }
        success {
            updateGitlabCommitStatus state: 'success'
        }
        failure {
            updateGitlabCommitStatus state: 'failed'
        }
    }
}
