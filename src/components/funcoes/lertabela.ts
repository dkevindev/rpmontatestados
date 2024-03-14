import ExcelJS from 'exceljs';

const workbook = new ExcelJS.Workbook();
const filename = 'C:\\DKDEV\\PROJETOS\\atestados\\rpmont-atestados\\src\\components\\funcoes\\planodechamada.xlsx';


export async function lerDadosExcel() {
    try {
        await workbook.xlsx.readFile(filename);
    } catch (error) {
        throw new Error(`O arquivo ${filename} não foi encontrado.`);
    }

    const worksheet = workbook.getWorksheet('plano');

    if (!worksheet) {
        throw new Error("Planilha 'dados' não encontrada no arquivo Excel.");
    }

    const dados:any = [];
    const headerRow:any = worksheet.getRow(1).values;

    worksheet.spliceRows(1, 1); // Remove a primeira linha (cabeçalho)

    worksheet.eachRow({ includeEmpty: false }, row => {
        const rowData:any = {};
        row.eachCell((cell, colNumber) => {
            rowData[headerRow[colNumber]] = cell.value;
        });
        dados.push(rowData);
    });

    return dados;
}
