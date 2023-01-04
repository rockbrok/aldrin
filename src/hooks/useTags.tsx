import { useEffect } from 'react';
// Hooks
import { removeKebab } from './useRemoveKebab';

const renderTags = (state: { tags: any[]; year: number; type: string; orbit: string; }) => {

  const tagSwitch = (props: { state: any; label: string; }) => {
    switch (true) {
      case (props.state === ""):
      case (props.label in state.tags):
        return null;
      default:
        state.tags.push({ value: props.state, label: props.label })
    }
  }

  useEffect(() => {
    tagSwitch({ state: state.year, label: "year" });
    tagSwitch({ state: state.type, label: "type" });
    tagSwitch({ state: removeKebab(state.orbit), label: "orbit" });
  }, []);

  return state.tags;
}

export { renderTags }