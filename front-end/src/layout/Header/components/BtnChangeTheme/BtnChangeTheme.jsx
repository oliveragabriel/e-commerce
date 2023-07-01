import { Button, Tooltip } from "antd"
import { useMemo } from "react"
import { BsSunFill } from "react-icons/bs"
import { RiMoonClearFill } from "react-icons/ri"
import PropTypes from 'prop-types'

const styledCss = { fontSize: 22, color: '#FFFFFF' }

export const BtnChangeTheme = ({ systemAtDarkMode, setSystemAtDarkMode}) => {

  const renderIconTheme = useMemo(() => {
    if (systemAtDarkMode) {
      return (
        <Tooltip title='Light Mode'>
          <BsSunFill style={styledCss}/> 
        </Tooltip>
      )
    }
    return (
      <Tooltip title='Dark Mode'>
        <RiMoonClearFill style={styledCss} />
      </Tooltip>
    )
  }, [systemAtDarkMode])


    return (
    <Button 
      type='text' 
      style={{ marginRight: 12 }}
      onClick={() => setSystemAtDarkMode(!systemAtDarkMode)} 
    >
      {renderIconTheme}
    </Button>
    )
}

BtnChangeTheme.propTypes = {
    systemAtDarkMode: PropTypes.bool.isRequired,
    setSystemAtDarkMode: PropTypes.func.isRequired
  }