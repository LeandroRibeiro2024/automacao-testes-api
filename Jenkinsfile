pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/seu-usuario/automacao-testes-api.git'
            }
        }
        stage('Run Postman Tests') {
            steps {
                script {
                    def postmanCollection = 'postman-collection.json' // Nome do arquivo da coleção do Postman
                    sh 'newman run ' + postmanCollection
                }
            }
        }
    }
}
