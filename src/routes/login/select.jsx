const listLabel = {
  color: '#666',
  fontSize: '0.34rem',
  marginLeft: '0',
  marginRight: '0.1rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  width: '1.7rem'
};

const listValue = {
  flex: '1',
  fontSize: '0.3rem'
};
// 如果不是使用 List.Item 作为 children
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: '#fff', padding: '0 0.3rem' }}>
    <div style={{ display: 'flex', height: '0.9rem', lineHeight: '0.9rem' }}>
      <div style={listLabel}>{props.children}</div>
      <div style={listValue}>{props.extra}</div>
    </div>
  </div>
);

export default CustomChildren;
