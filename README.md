1 - Escolha da Ferramenta para Automatizar Testes à API REST (https://gorest.co.in)
Para a automatização de testes à API REST https://gorest.co.in, a ferramenta escolhida é o Postman. Esta escolha é justificada pelos seguintes motivos:

Interface Intuitiva: Postman oferece uma interface amigável que facilita a criação, execução e gestão de testes de API sem necessidade de conhecimentos profundos em programação.
Validação de Schemas: Postman suporta a validação de schemas JSON, o que é essencial para garantir a conformidade dos dados recebidos.
Suporte a Testes Automatizados: Com o uso de scripts escritos em JavaScript, é possível automatizar verificações complexas e integrar com sistemas de CI/CD.
Relatórios Detalhados: Geração de relatórios detalhados que ajudam na análise dos resultados dos testes.
Integração com CI/CD: Postman pode ser facilmente integrado com ferramentas de CI/CD como Jenkins, permitindo a execução automatizada de testes em pipelines de desenvolvimento contínuo.


2 - Use Cases de Teste
Os casos de uso de teste para a API REST gorest.co.in incluem:

Validação de Esquema: Garantir que a resposta da API corresponde ao esquema JSON esperado.
Verificação do Status "Completed": Confirmar que todos os registros retornados pela API possuem o status "completed".
Validação da Data "due_on": Verificar e interpretar corretamente os valores do campo "due_on" para assegurar que estão no formato e no período corretos.

3- Automação com a API (gorest.co.in/public/v2/todos)
  1. Validação de Schema
     Para aplicar a validação de schema, utiliza-se a funcionalidade de testes do Postman:
     pm.test("Validação de Schema", function () {
    var schema = {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "id": {"type": "integer"},
                "user_id": {"type": "integer"},
                "title": {"type": "string"},
                "due_on": {"type": "string", "format": "date-time"},
                "status": {"type": "string"}
            },
            "required": ["id", "user_id", "title", "due_on", "status"]
        }
    };
    var jsonData = pm.response.json();
    pm.expect(tv4.validate(jsonData, schema)).to.be.true;
});

  2. Validação do Status "Completed"
     Para validar que todos os registros possuem o status "completed":
     pm.test("Todos os resultados têm status completed", function () {
    var jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.status).to.eql("completed");
    });
});

  3. Validação do Valor "due_on"
     Para interpretar e validar o valor do campo "due_on":
     pm.test("Validação do campo due_on", function () {
    var jsonData = pm.response.json();
    jsonData.forEach(item => {
        var dueDate = new Date(item.due_on);
        pm.expect(dueDate).to.be.a("date");
        pm.expect(dueDate).not.to.be.null;
    });
});


DevOps, CI/CD
4 - Testes de Carga
Para implementar testes de carga, pode-se utilizar a ferramenta JMeter devido à sua robustez e suporte a testes de desempenho em APIs REST. A implementação envolve:

Criação de um Plano de Teste: Configurar um plano de teste em JMeter para simular múltiplas requisições simultâneas à API.
Configuração de Parâmetros: Definir parâmetros como número de threads (usuários virtuais), ramp-up period e duração do teste.
Análise de Resultados: Gerar e analisar relatórios de desempenho para identificar possíveis gargalos e otimizar a API.

Solução de Continuous Testing
Para uma solução de Continuous Testing, recomenda-se:

Integração com CI/CD: Integrar os testes automatizados do Postman e os testes de carga do JMeter com ferramentas de CI/CD como Jenkins ou GitLab CI.
Execução Automática: Configurar a execução automática dos testes em cada commit ou push de código para garantir a integridade contínua do sistema.
Relatórios Automáticos: Gerar e enviar relatórios automáticos após cada execução de testes para a equipe de desenvolvimento, facilitando a rápida identificação e correção de falhas.
Essa abordagem assegura que a API é continuamente testada e validada, melhorando a qualidade e a confiabilidade do software ao longo do ciclo de desenvolvimento.
