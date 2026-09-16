import { useWordPressContext } from '../../context/WordPress/useWordPressContext';
import type { BlockComponentProps } from '../../types/blockTypes';
import React from 'react';

export const GroupBlock = ({ wpBlock, children }: BlockComponentProps) => {
  const { primitives, styles } = useWordPressContext();

  const ViewComponent = primitives.View;

  const layoutAttrs = wpBlock.attrs?.layout;
  const layoutType = layoutAttrs?.type; // "constrained", - simple group, "flex" or "grid"
  const flexWrap = layoutAttrs?.flexWrap === 'nowrap' ? 'nowrap' : 'wrap'; //used for grid/row with value nowrap
  const orientation =
    layoutAttrs?.orientation === 'vertical' ? 'column' : 'row'; // "vertical" for group/column
  const columnCount = layoutAttrs?.columnCount ?? 3; // 3 is default columns for grid if no value is provided

  const childrenArray = React.Children.toArray(children);

  //grid layout
  if (layoutType === 'grid') {
    const rows: React.ReactNode[][] = [];

    for (let i = 0; i < childrenArray.length; i += columnCount) {
      const rowChunk = childrenArray.slice(i, i + columnCount);

      while (rowChunk.length < columnCount) {
        //add blocks to keep the layout even if last row is "shorter"
        rowChunk.push(
          <ViewComponent
            key={`placeholder-${i}-${rowChunk.length}`}
            style={styles.GroupGridPlaceholder}
          />
        );
      }
      rows.push(rowChunk);
    }

    return (
      <ViewComponent style={styles.GroupBlock}>
        {rows.map((row, rowIndex) => (
          <ViewComponent key={`row-${rowIndex}`} style={styles.GroupGridRow}>
            {row.map((child, childIndex) => {
              if (
                React.isValidElement(child) &&
                child.key?.toString().startsWith('placeholder')
              ) {
                return child;
              }

              return (
                <ViewComponent key={childIndex} style={styles.GroupGridColumn}>
                  {child}
                </ViewComponent>
              );
            })}
          </ViewComponent>
        ))}
      </ViewComponent>
    );
  }

  //simple group
  if (layoutType === 'constrained') {
    return <ViewComponent style={styles.GroupBlock}>{children}</ViewComponent>;
  }

  //row/column group
  return (
    <ViewComponent
      style={[
        {
          flexDirection: orientation,
          flexWrap: flexWrap,
        },
        styles.GroupBlock,
      ]}
    >
      {childrenArray.map((child, idx) => (
        <ViewComponent key={idx} style={styles.GroupFlexItem}>
          {child}
        </ViewComponent>
      ))}
    </ViewComponent>
  );
};
