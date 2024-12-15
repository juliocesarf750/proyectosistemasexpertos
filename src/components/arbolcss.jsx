import React from 'react';

const NodoDecisionComponent = ({ nodo, nivel = 0, posX = 0, posY = 0, parentX = null, parentY = null, spacingX = 150, spacingY = 100 }) => {
  if (!nodo) return null;


  const numHijos = nodo.opciones?.length || 0;
  const childStartX = posX - ((numHijos - 1) * spacingX) / 2;

  return (
    <div style={{ position: 'relative' }}>

      <div
        style={{
          position: 'absolute',
          top: `${posY}px`,
          left: `${posX}px`,
          width: '120px',
          height: '60px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #007bff',
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxShadow: '2px 2px 5px rgba(0,0,0,0.2)',
        }}
      >
        {nodo.pregunta || nodo.decision}
      </div>


      {parentX !== null && parentY !== null && (
        <svg
          style={{
            position: 'absolute',
            overflow: 'visible',
            pointerEvents: 'none',
          }}
        >
          <line
            x1={parentX + 60}
            y1={parentY + 60}
            x2={posX + 60}
            y2={posY}
            stroke="#007bff"
            strokeWidth={2}
          />
        </svg>
      )}


      {nodo.opciones?.map((opcion, index) => (
        <React.Fragment key={index}>
          <span
            style={{
              position: 'absolute',
              top: `${posY + spacingY / 2 + 45}px`,
              left: `${childStartX + index * spacingX + 60}px`,
              transform: 'translateX(-50%)',
              color: 'black',
              fontSize: '14px',
              fontStyle: 'italic',
              width: '120px',
              textAlign: 'center',
              background: '#FFFFF6A0',
              zIndex: '1'
            }}
          >
            {opcion.opcion}
          </span>
          <NodoDecisionComponent
            nodo={opcion.nodoHijo}
            nivel={nivel + 1}
            posX={childStartX + index * spacingX}
            posY={posY + spacingY + 20}
            parentX={posX}
            parentY={posY}
            spacingX={spacingX}
            spacingY={spacingY}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default NodoDecisionComponent;


