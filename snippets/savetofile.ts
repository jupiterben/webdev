
function saveToJson(data: any, name: string) {
    const blob = new Blob([data], { type: 'text/json' });
    window.saveAs(blob, `${name}.json`);
}
