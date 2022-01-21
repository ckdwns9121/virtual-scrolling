import { useEffect, useState, useRef } from 'react';
import Items from './components/Items';
import './App.css';
import { WindowScroller, CellMeasurer, CellMeasurerCache, AutoSizer, List } from 'react-virtualized';
import axios from 'axios';
const cache = new CellMeasurerCache({
  defaultWidth: 50,
  fixedWidth: true,
});
function App() {
  const [posts, setPosts] = useState([]);
  const listRef = useRef(null);

  const getList = async () => {
    fetch('https://jsonplaceholder.typicode.com/posts').then(response => {
      const data = response.json();
      data.then(newPosts => {
        setPosts([...posts, ...newPosts]);
      });
    });
  };
  useEffect(() => {
    getList();
  }, []);
  const rowRenderer = ({ index, key, parent, style }) => {
    return (
      <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index} className="list">
        <div style={style} className="item">
          <div style={{ marginBottom: 15, color: 'white', backgroundColor: '#282c34' }}>
            <div>index: {index}</div>
            <div>id: {posts[index].id}</div>
            <div>userId: {posts[index].userId}</div>
            <div>title: {posts[index].title}</div>
            <div>body: {posts[index].body}</div>
          </div>
        </div>
      </CellMeasurer>
    );
  };
  return (
    <div className="App">
      <WindowScroller>
        {({ height, scrollTop, isScrolling, onChildScroll }) => (
          <AutoSizer disableHeight>
            {({ width }) => {
              return (
                <List
                  ref={listRef}
                  isScrolling={isScrolling}
                  onScroll={onChildScroll}
                  scrollTop={scrollTop}
                  autoHeight
                  width={width}
                  height={height}
                  rowCount={posts.length}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  list={posts}
                  deferredMeasurementCache={cache}
                  style={{ outline: 'none' }}
                />
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
}

export default App;
