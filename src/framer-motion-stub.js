// Stub pour framer-motion pour permettre la compilation sans erreurs
// Ceci est un remplaçant minimal pour framer-motion pour le déploiement

// Helper pour créer un composant React de base
const createComponent = (type) => {
  return function({ children, ...props }) {
    const Component = type;
    return <Component {...props}>{children}</Component>;
  };
};

// Création d'objets motion pour chaque type d'élément HTML
export const motion = {
  div: createComponent('div'),
  span: createComponent('span'),
  button: createComponent('button'),
  a: createComponent('a'),
  ul: createComponent('ul'),
  li: createComponent('li'),
  section: createComponent('section'),
  article: createComponent('article'),
  nav: createComponent('nav'),
  header: createComponent('header'),
  footer: createComponent('footer'),
  main: createComponent('main'),
  aside: createComponent('aside'),
  form: createComponent('form'),
  input: createComponent('input'),
  textarea: createComponent('textarea'),
  select: createComponent('select'),
  option: createComponent('option'),
  label: createComponent('label'),
  p: createComponent('p'),
  h1: createComponent('h1'),
  h2: createComponent('h2'),
  h3: createComponent('h3'),
  h4: createComponent('h4'),
  h5: createComponent('h5'),
  h6: createComponent('h6'),
  img: createComponent('img'),
  svg: createComponent('svg'),
  path: createComponent('path'),
  circle: createComponent('circle'),
  rect: createComponent('rect'),
  line: createComponent('line'),
  polyline: createComponent('polyline'),
  polygon: createComponent('polygon'),
  ellipse: createComponent('ellipse')
};

// Remplaçant pour AnimatePresence
export const AnimatePresence = ({ children }) => children;

// Hooks et fonctions simulées
export const useScroll = () => ({ scrollYProgress: { current: 0 } });
export const useSpring = (props) => props;
export const useAnimation = () => ({
  start: () => Promise.resolve(),
  stop: () => {},
});

// Autres fonctions utilitaires
export const useMotionValue = (initialValue) => ({ get: () => initialValue, set: () => {} });
export const useTransform = () => 0;
export const useCycle = (...args) => [args[0], () => {}];

export default {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useAnimation,
  useMotionValue,
  useTransform,
  useCycle
};
