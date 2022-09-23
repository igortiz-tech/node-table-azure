module.exports = app => {
    const controller = app.controllers.tableAzure;

    app.route('/api/v1/azure-table')
        .get(controller.listTable);

}
