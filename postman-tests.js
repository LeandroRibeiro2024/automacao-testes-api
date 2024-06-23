// Validação de Schema
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

// Validação do Status "Completed"
pm.test("Todos os resultados têm status completed", function () {
    var jsonData = pm.response.json();
    jsonData.forEach(item => {
        pm.expect(item.status).to.eql("completed");
    });
});

// Validação do Valor "due_on"
pm.test("Validação do campo due_on", function () {
    var jsonData = pm.response.json();
    jsonData.forEach(item => {
        var dueDate = new Date(item.due_on);
        pm.expect(dueDate).to.be.a("date");
        pm.expect(dueDate).not.to.be.null;
    });
});
