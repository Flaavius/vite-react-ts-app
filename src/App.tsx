import React, { useMemo, useState } from 'react'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

import css from './app.module.scss';
import mockFiles, { FileInfo } from './constants';

import { Checkbox, Button, Status } from './components';


function App({ files }: { files: FileInfo[]}) {

  const [ selectedFiles, setSelected ] = useState(Array.from({ length: files.length }, () => false));
  const selectedCount = selectedFiles.filter(Boolean).length;
  const indeterminate = selectedCount > 0 && selectedCount < files.length;

  const titleText = useMemo(() => selectedCount === 0 ? 'None Selected' : `Selected ${selectedCount}`, [ selectedCount ]);

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.download}>
          <div>
            <Checkbox
              indeterminate={indeterminate} 
              checked={selectedCount === files.length}
              onChange={(value) =>
                setSelected(s => Array.from({ length: s.length }, () => value))
              }
            />
            &nbsp;{titleText}
          </div>
          <div>
            <Button
              disabled={selectedCount === 0}
              icon={faDownload}
              label='Download'
              onClick={() => {
                window.alert(
                  files
                    .filter(({ status }, index) => status === 'available' && selectedFiles[index])
                    .map(({ device, path }) => device.concat(path))
                    .join('\n')
                )
              }}
            />
          </div>
        </div>
        <table cellSpacing={0} cellPadding={12}>
          <thead>
            <tr>
              <th>&nbsp;</th>
              <th> Name </th>
              <th> Device </th>
              <th> Path </th>
              <th> Status </th>
            </tr>
          </thead>
          <tbody>
            {files.map(({ name, device, path, status }, i) => (
              <tr
                key={name}
                className={clsx({ [css.selected]: selectedFiles[i] })}
              >
                <td>
                  <Checkbox
                    checked={selectedFiles[i]}
                    onChange={(val) => setSelected(s => {
                      const newState = [...s];
                      newState[i] = val;
                      return newState;
                    })}
                  />
                </td>
                <td>{name}</td>
                <td>{device}</td>
                <td>{path}</td>
                <td>
                  <Status status={status} />
                </td>
              </tr>))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

const withFiles = (files: FileInfo[]) => (Component: React.ElementType) => (props: Record<string, unknown> = {}) => (<Component {...props} files={files} />);

export default withFiles(mockFiles)(App);
