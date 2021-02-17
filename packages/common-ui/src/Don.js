import React from 'react'
import { Button } from 'antd'
import styles from './Don.module.less';

export const Don = props => {
  const { greeting } = props
  return (
    <div className={styles.don}>
      {greeting}! I'm <Button>Done</Button> Japanese
    </div>
  )
}
