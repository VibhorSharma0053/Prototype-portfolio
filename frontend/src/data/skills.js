import {
  SiReact, SiJavascript, SiHtml5, SiTailwindcss,
  SiPython, SiFastapi, SiNodedotjs, SiMongodb,
  SiGit, SiGithub, SiFigma,
} from 'react-icons/si';
import { FaCss3Alt } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

export const skillCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    color: 'from-primary-500 to-accent-500',
    skills: [
      { name: 'React', icon: SiReact, level: 90 },
      { name: 'JavaScript', icon: SiJavascript, level: 88 },
      { name: 'HTML5', icon: SiHtml5, level: 95 },
      { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500', level: 90 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 90 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: 'from-secondary-500 to-primary-500',
    skills: [
      { name: 'FastAPI', icon: SiFastapi, level: 85 },
      { name: 'Python', icon: SiPython, level: 87 },
      { name: 'Node.js', icon: SiNodedotjs, level: 70 },
    ],
  },
  {
    title: 'Database',
    icon: '🗃️',
    color: 'from-accent-500 to-secondary-500',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 82 },
    ],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    color: 'from-primary-400 to-secondary-400',
    skills: [
      { name: 'Git', icon: SiGit, level: 85 },
      { name: 'GitHub', icon: SiGithub, level: 88 },
      { name: 'Figma', icon: SiFigma, level: 75 },
      { name: 'VS Code', icon: VscVscode, color: 'text-blue-500', level: 95 },
    ],
  },
];
