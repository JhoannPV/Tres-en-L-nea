function Ganadores({ winners }) {
  const repetido = (id) => {
    let resp;
    const parOimpar = id % 2 === 0 ? "par" : "impar";
    if (parOimpar === "par") {
      resp = "(Registro Anterior Repetido)";
      return resp;
    }
  };
  return (
    <>
      <ul className="historial-ganador">
        {winners.map((winner) => {
          return (
            <>
              <li key={winner.id}>
                <p>
                  <strong>
                    Ganador: {winner.ganador}
                    <br />
                    el {winner.fecha}
                    <br />
                    {repetido(winner.id)}
                  </strong>
                </p>
              </li>
            </>
          );
        })}
      </ul>
    </>
  );
}

export default Ganadores;
