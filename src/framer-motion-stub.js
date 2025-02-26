// Stub pour framer-motion pour permettre la compilation sans erreurs
export const motion = {
  div: 'div',
  span: 'span',
  button: 'button',
  a: 'a',
  ul: 'ul',
  li: 'li',
  section: 'section',
  article: 'article',
  nav: 'nav',
  header: 'header',
  footer: 'footer',
  main: 'main',
  aside: 'aside',
  form: 'form',
  input: 'input',
  textarea: 'textarea',
  select: 'select',
  option: 'option',
  label: 'label',
  p: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  img: 'img',
  svg: 'svg',
  path: 'path',
  circle: 'circle',
  rect: 'rect',
  line: 'line',
  polyline: 'polyline',
  polygon: 'polygon',
  ellipse: 'ellipse',
};

export const AnimatePresence = ({ children }) => children;
export const useScroll = () => ({ scrollYProgress: { current: 0 } });
export const useSpring = (props) => props;
export const useAnimation = () => ({
  start: () => {},
  stop: () => {},
});

export default {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useAnimation,
};
