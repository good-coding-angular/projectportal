import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  input,
  model,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {TableColumn} from '../../models/table-column.class';
import {ObjectService} from '../../services/object.service';
import {Sorting} from '../../models/sorting.class';
import {Paging} from '../../models/paging.class';
import {SortOrder} from '../../models/sort-order.enum';
import {HelperService} from '../../services/helper.service';
import {Filter} from '../../models/filter.class';
import {CheckboxStateEnum} from '../../models/checkbox-state.enum';
import {IconTypeEnum} from '../../models/icon-type.enum';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import {SharedSelectionItemComponent} from '../shared-selection-item/shared-selection-item.component';
import {KeyValuePair} from '../../models/key-value-pair.class';
import {Subscription} from 'rxjs';
import {DynamicComponent} from '../../models/dynamic-component.class';
import {SharedEmptyComponent} from '../shared-empty/shared-empty.component';
import {CommonModule} from '@angular/common';
import {SharedCheckboxComponent} from '../shared-checkbox/shared-checkbox.component';
import {SharedIconComponent} from '../shared-icon/shared-icon.component';
import {SharedDynamicComponent} from '../shared-dynamic/shared-dynamic.component';

@Component({
  selector: 'app-shared-table',
  imports: [
    CommonModule,
    SharedCheckboxComponent,
    SharedIconComponent,
    SharedDynamicComponent,
  ],
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss'],
})
export class SharedTableComponent implements OnInit, OnChanges, OnDestroy {
  public objectService = inject(ObjectService);
  public helperService = inject(HelperService);

  public columns = input<TableColumn[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data = input<any>();

  public sorting = model<Sorting>();

  public paging = input(new Paging());

  public showPageBrowser = input(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public rowComponent = input<DynamicComponent<any>>();

  public rowComponentRowInputValues = input<KeyValuePair[]>();

  public rowComponentRowSignalInputValues = input<KeyValuePair[]>();

  public showColumnsForSelection = input(true);

  public rowsSelectable = input(false);

  public selectRowsWhenClicked = input(false);

  public selectRowsWhenDrag = input(false);

  public allRowsAreSelected = model(false);

  public rowsSelectedByFieldName = input('ROW_IS_SELECTED');

  public returnContentOfThisFieldWhenSelected = input<string>();

  public emptyCellContent = input(' ');

  public enableRowComponentDropDown = input(true);

  public showRowComponentMarkerName = input('SHOWROWCOMPONENT');

  public noDataText = input('Keine Einträge vorhanden');

  public noColumnsText = input('Keine Spalten definiert');

  @Output()
  public sortingChanged: EventEmitter<Sorting> = new EventEmitter<Sorting>();

  @Output()
  public pagingChanged: EventEmitter<Paging> = new EventEmitter<Paging>();

  @Output()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public selectedRowsChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output()
  public filterChanged: EventEmitter<TableColumn> = new EventEmitter<TableColumn>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public availableColumnsDropDown: DynamicComponent<any>[] = [];
  public availableColumnsChangeEmitter: EventEmitter<KeyValuePair> = new EventEmitter<KeyValuePair>();
  public availableColumnsChangeEmitterSubscription: Subscription = new Subscription();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public selectedRows: any[] = [];

  public windowWidth = 0;

  public hiddenColumnsByWindowWidth: TableColumn[] = [];

  public hasRowComponentToggleButton = false;

  public resizing = false;
  public resizeStartXOffset = 0;
  public resizingColumn?: TableColumn;

  public mouseDown = false;
  public isFirstSelectionRowSelected?: boolean = false;

  public selectionBoxTopStart = 0;
  public selectionBoxLeftStart = 0;
  public selectionBoxTop = 0;
  public selectionBoxLeft = 0;
  public selectionBoxWidth = 0;
  public selectionBoxHeight = 0;
  public selectionStartRowIndex = -1;
  public selectionCurrentRowIndex = -1;
  public selectionEndRowIndex = -1;

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onWindowResize(event: any): void {
    this.windowWidth = event.target.innerWidth;

    this.setHasRowComponentToggleButton();
  }

  @HostListener('body:mouseup')
  public onSelectionEnd(): void {
    if (this.selectRowsWhenDrag()) {
      this.setSelectionStartAndEndRowIndex();

      for (let index = this.selectionStartRowIndex; index <= this.selectionEndRowIndex; index++) {
        if (index !== -1) {
          this.data()[index][this.rowsSelectedByFieldName()] = !this.isFirstSelectionRowSelected;
          this.onRowClicked(this.data()[index]);
        }
      }

      this.mouseDown = false;
      this.isFirstSelectionRowSelected = undefined;
      this.resetSelectionAreaValues();
    }
  }

  public ngOnInit(): void {
    this.generateAvailableColumnsDropDownData();
    this.initAvailableColumnsChangeEmitter();
    this.initWindowWidth();
    this.preCalculateHiddenColumns();
    this.setHasRowComponentToggleButton();
    this.initSorting();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      this.generateAvailableColumnsDropDownData();
      this.preCalculateHiddenColumns();
      this.setHasRowComponentToggleButton();
    }
  }

  public ngOnDestroy(): void {
    if (this.availableColumnsChangeEmitterSubscription) {
      this.availableColumnsChangeEmitterSubscription.unsubscribe();
    }
  }

  public initSorting(): void {
    const sorting = this.sorting();
    const columns = this.columns();
    if (sorting && columns) {
      for (const column of columns) {
        if (column.nameInData === sorting.nameInData) {
          column.sortOrder = sorting.order;
        }
      }
    }
  }

  public preCalculateHiddenColumns(): void {
    const columns = this.columns();
    if (columns) {
      for (const column of columns) {
        this.showColumn(column);
      }
    }
  }

  public setHasRowComponentToggleButton(): void {
    this.hasRowComponentToggleButton = this.showRowComponentToggleButton();
  }

  public initWindowWidth(): void {
    this.windowWidth = (window.screen.width);
  }

  public generateAvailableColumnsDropDownData(): void {
    this.availableColumnsDropDown = [];

    const columns = this.columns();
    if (columns) {
      for (const column of columns) {
        this.availableColumnsDropDown.push(
          new DynamicComponent(
            {
              componentType: SharedSelectionItemComponent,
              signalInputs: {
                text: column.title,
                checked: !column.hidden,
                emitValue: column
              },
              outputs: {
                valueChanged: this.availableColumnsChangeEmitter
              }
            }
          )
        );
      }
    }
  }

  public initAvailableColumnsChangeEmitter(): void {
    this.availableColumnsChangeEmitterSubscription = this.availableColumnsChangeEmitter.subscribe(
      (changedColumnVisibilityState: KeyValuePair) => {
        switch (changedColumnVisibilityState.key) {
          case 'checked':
            changedColumnVisibilityState.value.hidden = false;

            this.setColumnCheckedInAvailableColumnsDropDown(
              changedColumnVisibilityState.value,
              true
            );

            break;
          case 'unchecked':
            changedColumnVisibilityState.value.hidden = true;

            this.setColumnCheckedInAvailableColumnsDropDown(
              changedColumnVisibilityState.value,
              false
            );

            break;
        }
      }
    );
  }

  public setColumnCheckedInAvailableColumnsDropDown(column: TableColumn, checked: boolean): void {
    for (const element of this.availableColumnsDropDown) {
      if (
        element.signalInputs.emitValue.title === column.title
        && element.signalInputs.emitValue.nameInData === column.nameInData
      ) {
        element.signalInputs.checked = checked;
      }
    }
  }

  public getAttributeFromObject(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    cellName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ifEmptyContent: any,
    visibleColumn: TableColumn | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any {
    switch (cellName) {
      case '*':
        return data;
      case '**':
        return {
          visibleColumn,
          data
        };
      default:
        return this.objectService.getAttributeFromObject(data, cellName, ifEmptyContent);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getDynamicComponent(visibleColumn: TableColumn, row: any): DynamicComponent<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dynamicComponent = new DynamicComponent<any>();

    dynamicComponent.moduleType = visibleColumn.dynamicComponent?.moduleType;
    dynamicComponent.componentType = visibleColumn.dynamicComponent?.componentType ?? SharedEmptyComponent;
    dynamicComponent.inputs = {...visibleColumn.dynamicComponent?.inputs};
    dynamicComponent.signalInputs = {...visibleColumn.dynamicComponent?.signalInputs};
    dynamicComponent.outputs = visibleColumn.dynamicComponent?.outputs;

    if (visibleColumn.dynamicComponentRowInputValues) {
      for (const rowInputValue of visibleColumn.dynamicComponentRowInputValues) {
        dynamicComponent.inputs[rowInputValue.key] = this.getAttributeFromObject(
          row,
          rowInputValue.value,
          null,
          visibleColumn
        );
      }
    }

    if (visibleColumn.dynamicComponentRowSignalInputValues) {
      for (const rowInputValue of visibleColumn.dynamicComponentRowSignalInputValues) {
        dynamicComponent.signalInputs[rowInputValue.key] = this.getAttributeFromObject(
          row,
          rowInputValue.value,
          null,
          visibleColumn
        );
      }
    }

    return dynamicComponent;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getHeaderStyle(tableColumn: TableColumn): any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const returnValue: any = {};

    if (tableColumn.width) {
      returnValue.width = tableColumn.width + 'px';
    }

    return returnValue;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public showRowComponentSection(row: any): boolean {
    return (
      (
        !!this.rowComponent()
        || this.hasHiddenColumnsByWindowWidth()
      )
      && !!row[this.showRowComponentMarkerName()]
      && row[this.showRowComponentMarkerName()] === true
    );
  }

  public showRowComponentToggleButton(): boolean {
    return (
      (
        this.hasHiddenColumnsByWindowWidth()
        || this.rowComponent() !== undefined
      )
      && this.enableRowComponentDropDown()
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public toggleRowComponent(row: any): void {
    if (row[this.showRowComponentMarkerName()] === undefined) {
      row[this.showRowComponentMarkerName()] = true;
    } else {
      row[this.showRowComponentMarkerName()] = !row[this.showRowComponentMarkerName()];
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isRowComponentVisible(row: any): boolean {
    if (row[this.showRowComponentMarkerName()] === undefined) {
      return false;
    }

    return row[this.showRowComponentMarkerName()];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getToggleRowComponentIcon(row: any): SolidIcons.IconDefinition {
    if (this.isRowComponentVisible(row)) {
      return SolidIcons.faAngleUp;
    }

    return SolidIcons.faAngleDown;
  }

  public showColumn(tableColumn: TableColumn): boolean {
    if (tableColumn.hidden) {
      return false;
    }

    if (
      !tableColumn.hideColumnWhenWindowNarrowerThanNrOfPixels
      || tableColumn.hideColumnWhenWindowNarrowerThanNrOfPixels < this.windowWidth
    ) {
      const tableColumnPosition = this.hiddenColumnsByWindowWidth.indexOf(tableColumn);

      if (tableColumnPosition !== -1) {
        this.hiddenColumnsByWindowWidth.splice(tableColumnPosition, 1);
      }

      return true;
    }

    if (this.hiddenColumnsByWindowWidth.indexOf(tableColumn) === -1) {
      this.hiddenColumnsByWindowWidth.push(tableColumn);
    }

    return false;
  }

  public hasHiddenColumnsByWindowWidth(): boolean {
    return !!this.hiddenColumnsByWindowWidth && this.hiddenColumnsByWindowWidth.length > 0;
  }

  public calculateColSpanForRowComponent(): number {
    const colspanForSelectorCheckbox = this.rowsSelectable()
      ? 1
      : 0;

    const columns = this.columns();
    if (
      columns
      && columns.length > 0
    ) {
      if (
        this.hiddenColumnsByWindowWidth
        && this.hiddenColumnsByWindowWidth.length > 0
      ) {
        return columns.length - this.hiddenColumnsByWindowWidth.length + colspanForSelectorCheckbox + 1;
      }

      return columns.length + colspanForSelectorCheckbox + 1;
    }

    return 1 + colspanForSelectorCheckbox;
  }

  public hasPageBrowser(): boolean {
    const paging = this.paging();
    return (
      this.showPageBrowser()
      && !!paging
      && (paging.total > 0)
      && (paging.take > 0)
      && (paging.total > paging.take)
    );
  }

  public columnAllowsFiltering(column: TableColumn): boolean {
    return (
      column.allowFiltering === true
    );
  }

  public columnAllowsSorting(column: TableColumn): boolean {
    return (
      column.allowSorting === true
    );
  }

  public hasNoSortOrder(column: TableColumn): boolean {
    return (
      column.sortOrder === SortOrder.none
    );
  }

  public hasAscendingSortOrder(column: TableColumn): boolean {
    return (
      column.sortOrder === SortOrder.asc
    );
  }

  public hasDescendingSortOrder(column: TableColumn): boolean {
    return (
      column.sortOrder === SortOrder.desc
    );
  }

  public getFilterIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faFilter;
  }

  public getNoSortOrderIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faSort;
  }

  public getAscendingSortOrderIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faSortAlphaUp;
  }

  public getDescendingSortOrderIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faSortAlphaDown;
  }

  public getIconType(): IconTypeEnum {
    return IconTypeEnum.fontAwesome;
  }

  public changeColumnSortOrder(column: TableColumn): void {
    if (this.columnAllowsSorting(column)) {
      const tempSortOrder: SortOrder = column.sortOrder;

      this.resetAllColumnSortOrders();
      this.setSortOrderByReferenceSortOrder(column, tempSortOrder);
      this.emitSortData(column);
    }
  }

  public resetAllColumnSortOrders(): void {
    const columns = this.columns();
    if (columns) {
      for (const visibleColumn of columns) {
        visibleColumn.sortOrder = SortOrder.none;
      }
    }
  }

  public setSortOrderByReferenceSortOrder(column: TableColumn, referenceSortOrder: SortOrder): void {
    if (
      referenceSortOrder === SortOrder.none
      || referenceSortOrder === undefined
      || referenceSortOrder === null
    ) {
      column.sortOrder = SortOrder.asc;
    } else if (referenceSortOrder === SortOrder.asc) {
      column.sortOrder = SortOrder.desc;
    } else if (referenceSortOrder === SortOrder.desc) {
      column.sortOrder = SortOrder.asc;
    }
  }

  public emitSortData(column: TableColumn): void {
    if (this.sortingChanged) {
      let sorting = this.sorting();
      if (!sorting) {
        sorting = new Sorting(this.helperService);
      }

      sorting.title = column.title;
      sorting.nameInData = column.nameInData;
      sorting.order = column.sortOrder;

      this.sorting.set(sorting);
      this.sortingChanged.emit(sorting);
    }
  }

  public emitPagingData(paging: Paging): void {
    if (this.pagingChanged) {
      this.pagingChanged.emit(paging);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public rowsSelectableChange(event: CheckboxStateEnum, row: any): void {
    if (this.rowsSelectedByFieldName()) {
      row[this.rowsSelectedByFieldName()] = (event !== CheckboxStateEnum.none);
    }

    this.pushPopSelectedRows(row);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public pushPopSelectedRows(row: any): void {
    const data = this.data();
    const returnContentOfThisFieldWhenSelected = this.returnContentOfThisFieldWhenSelected();
    if (
      this.selectedRows[0] === '*'
    ) {
      this.selectedRows = [];
      this.allRowsAreSelected.set(false);

      if (data) {
        for (const entry of data) {
          if (entry[this.rowsSelectedByFieldName()]) {
            if (
              returnContentOfThisFieldWhenSelected
              && entry[returnContentOfThisFieldWhenSelected]
            ) {
              this.selectedRows.push(entry[returnContentOfThisFieldWhenSelected]);
            } else {
              this.selectedRows.push(entry);
            }
          }
        }
      }
    } else if (returnContentOfThisFieldWhenSelected) {
      const itemIndex = this.selectedRows.indexOf(row[returnContentOfThisFieldWhenSelected]);

      if (itemIndex === -1) {
        if (row[returnContentOfThisFieldWhenSelected]) {
          this.selectedRows.push(row[returnContentOfThisFieldWhenSelected]);
        } else {
          this.selectedRows.push(row);
        }
      } else {
        this.selectedRows.splice(itemIndex, 1);
      }
    } else {
      const itemIndex = this.selectedRows.indexOf(row);

      if (itemIndex === -1) {
        this.selectedRows.push(row);
      } else {
        this.selectedRows.splice(itemIndex, 1);
      }
    }

    if (this.selectedRowsChanged) {
      this.selectedRowsChanged.emit(this.selectedRows);
    }
  }

  public selectDeselectAll(event: CheckboxStateEnum): void {
    const data = this.data();
    const returnContentOfThisFieldWhenSelected = this.returnContentOfThisFieldWhenSelected();
    if (event === CheckboxStateEnum.allChecked) {
      this.allRowsAreSelected.set(true);

      this.selectedRows = ['*'];

      if (data) {
        for (const row of data) {
          row[this.rowsSelectedByFieldName()] = true;
        }
      }

      if (this.selectedRowsChanged) {
        this.selectedRowsChanged.emit(this.selectedRows);
      }

      return;
    }

    this.allRowsAreSelected.set(false);

    if (event === CheckboxStateEnum.checked) {
      if (this.rowsSelectedByFieldName()) {
        this.selectedRows = [];

        if (data) {
          for (const entry of data) {
            entry[this.rowsSelectedByFieldName()] = true;

            if (returnContentOfThisFieldWhenSelected) {
              this.selectedRows.push(entry[returnContentOfThisFieldWhenSelected]);
            } else {
              this.selectedRows.push(entry);
            }
          }
        }
      } else {
        this.selectedRows = data;
      }
    } else {
      if (data) {
        for (const entry of data) {
          entry[this.rowsSelectedByFieldName()] = false;
        }
      }

      this.selectedRows = [];
    }

    if (this.selectedRowsChanged) {
      this.selectedRowsChanged.emit(this.selectedRows);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public isCheckboxChecked(row: any): CheckboxStateEnum {
    if (
      !!this.selectedRows
      && this.selectedRows.length === 1
      && this.selectedRows[0] === '*'
    ) {
      return CheckboxStateEnum.checked;
    }

    if (this.rowsSelectedByFieldName()) {
      if (row[this.rowsSelectedByFieldName()]) {
        return CheckboxStateEnum.checked;
      } else {
        return CheckboxStateEnum.none;
      }
    } else {
      if (this.selectedRows.indexOf(row) !== -1) {
        return CheckboxStateEnum.checked;
      } else {
        return CheckboxStateEnum.none;
      }
    }
  }

  public areAllEntriesSelected(): CheckboxStateEnum {
    if (this.allRowsAreSelected()) {
      return CheckboxStateEnum.allChecked;
    }

    const data = this.data();
    if (
      !!data
      && data.length === 0
    ) {
      return CheckboxStateEnum.none;
    }

    if (data) {
      for (const row of data) {
        if (this.rowsSelectedByFieldName()) {
          if (!row[this.rowsSelectedByFieldName()]) {
            return CheckboxStateEnum.none;
          }
        } else {
          if (this.selectedRows.indexOf(row) === -1) {
            return CheckboxStateEnum.none;
          }
        }
      }
    }

    return CheckboxStateEnum.checked;
  }

  public allDataIsPresent(): boolean {
    const data = this.data();
    const paging = this.paging();
    return !!data
      && !!paging
      && data.length === paging.getTotal();
  }

  public hasNoData(): boolean {
    const data = this.data();
    return !data || data.length === 0;
  }

  public hasNoVisibleColumns(): boolean {
    const columns = this.columns();
    return !columns || columns.length === 0;
  }

  public showFilterSelector(visibleColumn: TableColumn): boolean {
    return visibleColumn.showFilterSelector;
  }

  public toggleShowFilterSelector(visibleColumn: TableColumn): void {
    if (!visibleColumn.filter) {
      this.initFilterForColumn(visibleColumn);
    }

    visibleColumn.showFilterSelector = !visibleColumn.showFilterSelector;
  }

  public initFilterForColumn(column: TableColumn): void {
    column.filter = new Filter();
    column.filter.idInData = column.nameInData;
  }

  public setFilter(column: TableColumn): void {
    column.showFilterSelector = false;

    if (this.filterChanged) {
      this.filterChanged.emit(column);
    }
  }

  public deleteFilter(column: TableColumn): void {
    column.filter = undefined;
    column.showFilterSelector = false;

    if (this.filterChanged) {
      this.filterChanged.emit(column);
    }
  }

  public cancelFilter(column: TableColumn): void {
    column.showFilterSelector = false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getFilter(filter?: Filter): any {
    return filter ?? new Filter();
  }

  public isResizingAllowed(column: TableColumn): boolean {
    return column.allowResizing;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public resizeStart(mouseDownEvent: any, column: TableColumn): void {
    this.resizing = true;
    this.resizeStartXOffset = mouseDownEvent.clientX;

    column.originalWidth = mouseDownEvent.target.parentElement.offsetWidth ?? 0;
    this.resizingColumn = column;
  }

  public resizeDrag(event: MouseEvent): void {
    if (this.resizing && this.resizingColumn) {
      this.resizingColumn.width = (this.resizingColumn.originalWidth ?? 0) + (event.x - this.resizeStartXOffset);
    }
  }

  public resizeEnd(): void {
    if (this.resizing) {
      this.resizing = false;
      this.resizingColumn = undefined;
    }
  }

  public getResizeIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faArrowsAltH;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onRowClicked(row: any): void {
    if (this.selectRowsWhenDrag()) {
      row[this.rowsSelectedByFieldName()] = !this.isFirstSelectionRowSelected;
      this.pushPopSelectedRows(row);
    } else if (this.selectRowsWhenClicked()) {
      row[this.rowsSelectedByFieldName()] = !row[this.rowsSelectedByFieldName()];
      this.pushPopSelectedRows(row);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getTableHeaderRowClass(): any {
    return {
      'shared-table__selected-header-row': this.areAllEntriesSelected()
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getTableDataRowClass(row: any): any {
    return {
      'shared-table__selected-row': this.isCheckboxChecked(row)
    };
  }

  public getShowAvailableColumnsForSelectionIcon(): SolidIcons.IconDefinition {
    return SolidIcons.faList;
  }

  public showStaticInvisibleColumn(column: TableColumn): boolean {
    if (column.hidden) {
      return false;
    }

    return !column.dynamicComponent && !this.showColumn(column);
  }

  public showDynamicInvisibleColumn(column: TableColumn): boolean {
    if (column.hidden) {
      return false;
    }

    return !!column.dynamicComponent && !this.showColumn(column);
  }

  public onSelectionStart(event: MouseEvent, index: number): void {
    if (this.selectRowsWhenDrag()) {
      event.preventDefault();
      this.isFirstSelectionRowSelected = !!this.data()[index][this.rowsSelectedByFieldName()];
      this.selectionStartRowIndex = index;
    }
  }

  public onSelection(index: number): void {
    if (this.selectRowsWhenDrag()) {
      if (!this.mouseDown) {
        return;
      }

      if (this.isFirstSelectionRowSelected === undefined) {
        this.isFirstSelectionRowSelected = !!this.data()[index][this.rowsSelectedByFieldName()];
      }

      this.setCurrentRowIndex(index);
    }
  }

  public repositionSelectionRectangular(event: MouseEvent): void {
    this.selectionBoxLeftStart = event.clientX;
    this.selectionBoxTopStart = event.clientY;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getSelectionAreaStyle(): any {
    return {
      top: this.selectionBoxTop + 'px',
      left: this.selectionBoxLeft + 'px',
      width: this.selectionBoxWidth + 'px',
      height: this.selectionBoxHeight + 'px'
    };
  }

  public onDrawSelectionAreaStart(event: MouseEvent): void {
    if (this.selectRowsWhenDrag()) {
      this.mouseDown = true;
      this.repositionSelectionRectangular(event);
    }
  }

  public drawSelectionArea(event: MouseEvent): void {
    if (this.selectRowsWhenDrag() && this.mouseDown) {
      if (event.clientX < this.selectionBoxLeftStart) {
        this.selectionBoxLeft = event.clientX;
        this.selectionBoxWidth = this.selectionBoxLeftStart - event.clientX;
      } else {
        this.selectionBoxLeft = this.selectionBoxLeftStart;
        this.selectionBoxWidth = event.clientX - this.selectionBoxLeftStart;
      }

      if (event.clientY < this.selectionBoxTopStart) {
        this.selectionBoxTop = event.clientY;
        this.selectionBoxHeight = this.selectionBoxTopStart - event.clientY;
      } else {
        this.selectionBoxTop = this.selectionBoxTopStart;
        this.selectionBoxHeight = event.clientY - this.selectionBoxTopStart;
      }
    }
  }

  public resetSelectionAreaValues(): void {
    this.selectionBoxTopStart = 0;
    this.selectionBoxLeftStart = 0;
    this.selectionBoxLeft = 0;
    this.selectionBoxTop = 0;
    this.selectionBoxWidth = 0;
    this.selectionBoxHeight = 0;

    this.selectionStartRowIndex = -1;
    this.selectionCurrentRowIndex = -1;
    this.selectionEndRowIndex = -1;
  }

  public setSelectionStartAndEndRowIndex(): void {
    if (
      this.selectionStartRowIndex === -1
      && this.selectionEndRowIndex !== -1
      && this.selectionCurrentRowIndex === -1
    ) {
      this.selectionStartRowIndex = this.selectionEndRowIndex;
    } else if (
      this.selectionStartRowIndex !== -1
      && this.selectionEndRowIndex === -1
      && this.selectionCurrentRowIndex === -1
    ) {
      this.selectionEndRowIndex = this.selectionStartRowIndex;
    } else if (
      this.selectionStartRowIndex < this.selectionCurrentRowIndex
    ) {
      this.selectionEndRowIndex = this.selectionCurrentRowIndex;
    } else {
      this.selectionEndRowIndex = this.selectionStartRowIndex;
      this.selectionStartRowIndex = this.selectionCurrentRowIndex;
    }
  }

  public setCurrentRowIndex(index: number): void {
    if (this.selectionStartRowIndex === -1) {
      this.selectionStartRowIndex = index;
    }

    this.selectionCurrentRowIndex = index;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getRowComponent(row: any): DynamicComponent<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dynamicComponent = new DynamicComponent<any>();

    const rowComponent = this.rowComponent();
    const rowComponentRowInputValues = this.rowComponentRowInputValues();
    const rowComponentRowSignalInputValues = this.rowComponentRowSignalInputValues();

    dynamicComponent.moduleType = rowComponent?.moduleType;
    dynamicComponent.componentType = rowComponent?.componentType ?? SharedEmptyComponent;
    dynamicComponent.inputs = {...rowComponent?.inputs};
    dynamicComponent.signalInputs = {...rowComponent?.signalInputs};
    dynamicComponent.outputs = rowComponent?.outputs;

    if (rowComponentRowInputValues) {
      for (const rowInputValue of rowComponentRowInputValues) {
        dynamicComponent.inputs[rowInputValue.key] = this.getAttributeFromObject(
          row,
          rowInputValue.value,
          null,
          undefined
        );
      }
    }

    if (rowComponentRowSignalInputValues) {
      for (const rowInputValue of rowComponentRowSignalInputValues) {
        dynamicComponent.signalInputs[rowInputValue.key] = this.getAttributeFromObject(
          row,
          rowInputValue.value,
          null,
          undefined
        );
      }
    }

    return dynamicComponent;
  }
}
