import { Button, Card } from "antd"
import { converteValorInteiroParaValorMonetario } from "../../functions"
import { CardImagemContainer } from "./CardImagemContainer"
import PropTypes from 'prop-types'

const { Meta } = Card

export const CardDeProduto = ({ p, idx, dlt }) => {
    return (
      <Card
        hoverable
        key={idx}
        style={{ width: 274 }}
        cover={<CardImagemContainer dlt={dlt} />}
      >
        <Meta title={p.produto} description={p.descricao} />
        <div 
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginTop: '16px',
            fontSize: '16px',
            fontWeight: 600 
          }}
        >
          <p>R$ {converteValorInteiroParaValorMonetario(p.valor)}</p>
        </div>
        <div style={{ marginTop: 16 }}>
          <Button 
            type='primary'
            style={{ width:  '100%' }}
          >
            Comprar
          </Button>
        </div>
      </Card>   
    )
}

CardDeProduto.propTypes = {
  p: PropTypes.any.isRequired,
  idx: PropTypes.number.isRequired,
  dlt: PropTypes.bool
}