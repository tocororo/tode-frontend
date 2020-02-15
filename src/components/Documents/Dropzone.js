import React, {useCallback, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory} from 'react-router-dom';
import {useDropzone} from 'react-dropzone'
import { Segment, Icon, Header } from 'semantic-ui-react';
import styled from 'styled-components'

import { createText, getDocumentByName } from '../../actions/DocumentAction'

const MyIcon = styled(Icon)`
  &&& {
   color: #1d314d;
  }
`

function Dropzone(props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const [document, setDocument] = useState('');
  const { doc}  = useSelector(state => state.doc);

  useEffect(()=>
    dispatch(getDocumentByName(props.match.params.name))
  ,[])

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result 

        setDocument (doc._id )

        const newText = {binaryStr,document}
        dispatch(createText(props.match.params.name, newText, history));
      }
      reader.readAsBinaryString(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
        <Segment placeholder >
            <Header icon>
            <input {...getInputProps()} />
            <MyIcon size='big' name='pdf file outline' />
            Si ya tiene un archivo listo para subir arrastrelo hasta aqui
            </Header>
        </Segment>
    </div>
  )
}

export default Dropzone