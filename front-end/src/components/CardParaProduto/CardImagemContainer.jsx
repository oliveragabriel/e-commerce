import PropTypes from 'prop-types'
import { Button, Image, Row, Spin } from 'antd'
import { useMemo } from 'react'
import { DeleteFilled, HeartFilled, LoadingOutlined } from '@ant-design/icons'

export const CardImagemContainer = ({ p, dlt, fvt }) => {

  const renderBtn = useMemo(() => { 
    if(!dlt) {
      return (
        <div style={{ position: 'absolute', right: 10, top: 10 }}>
          <Button 
            type='text'
            icon={<HeartFilled style={{color: '#ff4d4f'}} />} 
            title='Favoritar'
            onClick={() => fvt(p.id)}
          />
        </div>
      )
    }
    return (
      <div style={{ position: 'absolute', right: 10, top: 10 }}>
        <Button 
          type='text'
          icon={<DeleteFilled style={{color: '#ff4d4f'}} />} 
          title='Remover'
          onClick={() => dlt(p.id)}
        />
      </div>
    )
  }, [dlt, fvt, p.id])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {renderBtn}
      <div className='image-container' style={{ marginTop: '10px' }}>
        <Image 
          preview={false} 
          placeholder={
            <Row justify='center'>
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            </Row>
          } 
          alt="product-image" 
          height={120} 
          src={p?.foto} 
          style={{ width: '100%' }} 
        />
      </div>
    </div>
  )
}

CardImagemContainer.propTypes = {
  p: PropTypes.any.isRequired,
  dlt: PropTypes.func,
  fvt: PropTypes.func
}