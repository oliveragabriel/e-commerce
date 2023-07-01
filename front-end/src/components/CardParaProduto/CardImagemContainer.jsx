import acerAspire from '../../assets/images/acer-aspire-3.png'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { useMemo } from 'react'
import { DeleteFilled } from '@ant-design/icons'

export const CardImagemContainer = ({ dlt }) => {

  const renderBtn = useMemo(() => { 
    if(!dlt) return null
    return (
      <div style={{ position: 'absolute', right: 10, top: 10 }}>
        <Button 
          type='text'
          icon={<DeleteFilled style={{color: '#ff4d4f'}} />} 
          title='Remover'
        />
      </div>
    )
  }, [dlt])

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {renderBtn}
      <img alt="example" src={acerAspire} style={{ width: '100%' }} />
    </div>
  )
}

CardImagemContainer.propTypes = {
  dlt: PropTypes.bool
}