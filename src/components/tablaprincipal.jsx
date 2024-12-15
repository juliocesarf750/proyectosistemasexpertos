export const TablaPrincipal=()=>{
    return(
        <div style={{ width: '400px', height: '600px', margin: 'auto', marginTop: '0px' }}>
        <h1>tabla principal</h1>
        <table border="1" style={{ borderCollapse: "collapse", width: "auto" }}>
          <thead>
            <tr>
              {Header.elemento[0].map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {M.elemento.map((fila, index) => (
              <tr style={{ padding: '0px 15px' }} key={index}>
                {fila.map((col, colIndex) => (
                  <td style={{ padding: '0px 15px' }} key={colIndex}>{Value.elemento[0][col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}