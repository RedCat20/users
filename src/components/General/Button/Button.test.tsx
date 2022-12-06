import renderer from 'react-test-renderer';
import Button from './Button';

it('changes the class when hovered', () => {
    const component = renderer.create(
        <Button onClickCallback={() => {}}>Facebook</Button>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
        if (!tree) return;
        if ("props" in tree) {
            tree.props.onMouseEnter();
        }
    });
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    renderer.act(() => {
        if (!tree) return;
        if ("props" in tree) {
            tree.props.onMouseLeave();
        }
    });
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});