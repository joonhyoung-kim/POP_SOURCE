using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using MetroFramework.Controls;

namespace SmartMom_Lib
{
    public class ExGrid : DataGridView
    {
        //데이터가 바인딩되었는지 여부
        private bool isBind = false;

        //그리드의 키칼럼 및 키칼럼값의 리스트 변수
        private List<string> keyColumns = null;

        //그리드와 연결된 DataTable변수
        private DataTable bindDataTable = null;

        // 체크박스 전체 선택
        private CheckBox checkBoxAll = new CheckBox();

        //데이터가 바인딩되었는지 여부 속성
        public bool IsBind
        {
            get { return isBind; }
        }

        //그리드와 연결된 DataTable 속성
        public DataTable BindDataTable
        {
            get { return bindDataTable; }
        }

        [Description("컨트롤에 열결된 Data를 설정합니다."), Category("Data")]
        public object Data { get; set; }

        [Description("컨트롤에 열결된 언어를 설정합니다."), Category("Language")]
        public String LanguageCode { get; set; }

        [Description("컨트롤에 열결된 언어의 범주를 설정합니다."), Category("Category")]
        public String LanguageCategory { get; set; }

        /// <summary>
        /// 생성자
        /// </summary>
        public ExGrid()
        {
            this.SetStyle(ControlStyles.DoubleBuffer | ControlStyles.AllPaintingInWmPaint | ControlStyles.UserPaint, true);

            //행추가 설정 비허용
            this.AllowUserToAddRows = false;
            //행사이즈 설정 비허용
            this.AllowUserToResizeRows = false;
            //행 머리글 보이지 않게 설정
            this.RowHeadersVisible = false;
            //그리드의 셀을 선택시 모드는 셀 선택모드로 설정
            //this.SelectionMode = DataGridViewSelectionMode.CellSelect;
            //편집모드를 키입력시 편집모드로 설정
            this.EditMode = DataGridViewEditMode.EditOnKeystroke;
            //칼럼헤더 높이 설정
            this.ColumnHeadersHeight = 30;
            //컬럼사이즈 설정 비허용
            this.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;

        }

        /// <summary>
        /// 그리드 스타일 적용
        /// </summary>
        public void SetBorderAndGridlineStyles()
        {
            this.GridColor = Color.LightCyan;
            this.BorderStyle = BorderStyle.FixedSingle;
            this.CellBorderStyle = DataGridViewCellBorderStyle.Raised;
            this.RowHeadersBorderStyle = DataGridViewHeaderBorderStyle.Raised;
            this.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.Raised;

            this.DefaultCellStyle.Font = new Font("맑은고딕", 24F, FontStyle.Bold);
            this.DefaultCellStyle.ForeColor = Color.Black;
            this.RowTemplate.Height = 80;
            this.ColumnHeadersDefaultCellStyle.Font = new Font("맑은고딕", 18F, FontStyle.Bold);
            this.ColumnHeadersDefaultCellStyle.ForeColor = Color.Black;


        }

        /// <summary>
        /// 그리드내 콤보박스의 목록을 ArrayList로 채운다
        /// </summary>
        /// <param name="columnName"></param> 그리드의 칼럼명
        /// <param name="arrayList"></param> 콤보박스 목록 Data
        /// <param name="valueMember"></param> 콤보박스 키값 칼럼명
        /// <param name="displayMember"></param> 콤보박스 텍스트값 칼럼명
        public void SetComboBoxCell(string columnName, Array arrayList, string valueMember, string displayMember)
        {
            DataGridViewComboBoxColumn comboBoxColumn = this.Columns[columnName] as DataGridViewComboBoxColumn;
            comboBoxColumn.DataSource = arrayList;
            comboBoxColumn.ValueMember = valueMember;
            comboBoxColumn.DisplayMember = displayMember;
            comboBoxColumn.DisplayStyle = DataGridViewComboBoxDisplayStyle.ComboBox;
            comboBoxColumn.DisplayStyleForCurrentCellOnly = true;
        }

        /// <summary>
        /// 그리드내 콤보박스의 목록을 DataTable로 채운다
        /// </summary>
        /// <param name="columnName"></param>그리드의 칼럼명
        /// <param name="dataTable"></param>콤보박스 목록 Data
        /// <param name="valueMember"></param>콤보박스 키값 칼럼명
        /// <param name="displayMember"></param>콤보박스 텍스트값 칼럼명
        public void SetComboBoxCell(string columnName, DataTable dataTable, string valueMember, string displayMember)
        {
            DataGridViewComboBoxColumn comboBoxColumn = this.Columns[columnName] as DataGridViewComboBoxColumn;
            comboBoxColumn.DataSource = dataTable;
            comboBoxColumn.ValueMember = valueMember;
            comboBoxColumn.DisplayMember = displayMember;
            comboBoxColumn.DisplayStyle = DataGridViewComboBoxDisplayStyle.ComboBox;
            comboBoxColumn.DisplayStyleForCurrentCellOnly = true;
        }

        /// <summary>
        /// 데이타 바인딩 메소드
        /// </summary>
        /// <param name="dataTable"></param>
        /// <param name="updateFlag"></param>
        public void DataBind(DataTable dataTable, bool checkFlag, bool statusFlag)
        {
            try
            {
                if (dataTable != null)
                {
                    isBind = false;

                    SetExtColumn(true, checkFlag, statusFlag);

                    this.bindDataTable = dataTable;

                    this.Rows.Clear();

                    if (this.Controls.ContainsKey("checkBoxAll"))
                    {
                        CheckBox checkBox = this.Controls["checkBoxAll"] as CheckBox;
                        checkBox.Checked = false;
                    }

                    foreach (DataRow dataRow in dataTable.Rows)
                    {
                        int rowIndex = this.Rows.Add();
                        this.Rows[rowIndex].Cells["row_index"].Value = dataTable.Rows.IndexOf(dataRow) + 1;

                        foreach (DataColumn dataColumn in dataTable.Columns)
                        {
                            if (this.Columns.Contains(dataColumn.ColumnName))
                            {
                                this.Rows[rowIndex].Cells[dataColumn.ColumnName].Value = dataRow[dataColumn.ColumnName];
                            }

                            if (this.keyColumns.Contains(dataColumn.ColumnName))
                            {
                                this.Rows[rowIndex].Cells[dataColumn.ColumnName].ReadOnly = true;
                            }


                        }
                    }

                    isBind = true;
                }
                bindDataTable = dataTable;

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }

        /// <summary>
        /// 데이타 바인딩 메소드
        /// </summary>
        /// <param name="dataTable"></param>
        /// <param name="updateFlag"></param>
        public void DataBindDataSource(DataTable dataTable, bool checkFlag, bool statusFlag)
        {
            try
            {
                if (dataTable != null)
                {
                    isBind = false;

                    SetExtColumn(true, checkFlag, statusFlag);

                    this.bindDataTable = dataTable;

                    //this.Rows.Clear();

                    if (this.Controls.ContainsKey("checkBoxAll"))
                    {
                        CheckBox checkBox = this.Controls["checkBoxAll"] as CheckBox;
                        checkBox.Checked = false;
                    }

                    this.AutoGenerateColumns = false;
                    this.DataSource = dataTable;

                    isBind = true;
                }


            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

        }


        /// <summary>
        /// 필수 입력칼럼 스타일 설정
        /// 필수 입력칼럼의 폰트를 볼드로 설정
        /// </summary>
        /// <param name="requireColumnArray"></param>
        public void SetRequireColumn(params string[] requireColumnArray)
        {
            foreach (string columnName in requireColumnArray)
            {
                if (this.Columns.Contains(columnName))
                {
                    this.Columns[columnName].HeaderCell.Style.Font = new Font(this.Font, FontStyle.Bold);
                }
            }
        }

        /// <summary>
        /// 확장칼럼(행번호 및 행상태 칼럼) 생성
        /// </summary>
        /// <param name="isVisibleRowNumber"></param>
        /// <param name="isVisibleCheckBox"></param>
        /// <param name="isVisibleRowFlag"></param>
        /// <param name="keyColumnArray"></param>
        public void SetExtColumn(bool isVisibleRowNumber, bool isVisibleCheckBox, bool isVisibleRowFlag, params string[] keyColumnArray)
        {
            //행번호 칼럼 생성
            if (!this.Columns.Contains("row_index"))
            {
                DataGridViewColumn numberColumn = new DataGridViewTextBoxColumn();
                numberColumn.ReadOnly = true;
                numberColumn.HeaderText = "No";

                numberColumn.Name = "row_index";
                numberColumn.Frozen = true;
                numberColumn.Visible = isVisibleRowNumber;
                numberColumn.SortMode = DataGridViewColumnSortMode.NotSortable;

                numberColumn.Width = 0;
                if (isVisibleRowNumber)
                {
                    numberColumn.Width = 80;
                }

                numberColumn.Resizable = DataGridViewTriState.False;
                numberColumn.HeaderCell.Style.Alignment = DataGridViewContentAlignment.MiddleCenter;
                numberColumn.AutoSizeMode = DataGridViewAutoSizeColumnMode.None;
                numberColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                numberColumn.DefaultCellStyle.BackColor = this.ColumnHeadersDefaultCellStyle.BackColor;

                this.Columns.Insert(0, numberColumn);
            }

            //행체크 칼럼 생성
            if (!this.Columns.Contains("row_check"))
            {
                DataGridViewCheckBoxColumn checkColumn = new DataGridViewCheckBoxColumn();

                checkColumn.HeaderText = "선택";
                checkColumn.Width = 50;
                checkColumn.Name = "row_check";
                checkColumn.ThreeState = false;
                checkColumn.TrueValue = true;
                checkColumn.FalseValue = false;
                checkColumn.IndeterminateValue = false;
                checkColumn.Frozen = true;
                checkColumn.Visible = isVisibleCheckBox;
                checkColumn.SortMode = DataGridViewColumnSortMode.NotSortable;

                checkColumn.Resizable = DataGridViewTriState.False;
                checkColumn.HeaderCell.Style.Alignment = DataGridViewContentAlignment.MiddleCenter;
                checkColumn.AutoSizeMode = DataGridViewAutoSizeColumnMode.None;
                checkColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                checkColumn.DefaultCellStyle.BackColor = this.ColumnHeadersDefaultCellStyle.BackColor;

                this.Columns.Insert(1, checkColumn);

            }

            //행상태 칼럼 생성
            if (!this.Columns.Contains("row_flag"))
            {
                DataGridViewColumn flagColumn = new DataGridViewTextBoxColumn();
                flagColumn.ReadOnly = true;
                flagColumn.HeaderText = "Status";
                flagColumn.Name = "row_flag";
                flagColumn.Frozen = true;
                flagColumn.Visible = isVisibleRowFlag;
                flagColumn.SortMode = DataGridViewColumnSortMode.NotSortable;

                flagColumn.Resizable = DataGridViewTriState.False;
                flagColumn.HeaderCell.Style.Alignment = DataGridViewContentAlignment.MiddleCenter;
                flagColumn.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCells;
                flagColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                flagColumn.DefaultCellStyle.BackColor = this.ColumnHeadersDefaultCellStyle.BackColor;

                this.Columns.Insert(2, flagColumn);
            }

            this.keyColumns = keyColumnArray.ToList<string>();

        }

        /// <summary>
        /// 필수 입력 칼럼 여부 체크 메소드
        /// 신규행을 입력시 필수 칼럼의 값이 입력되었는지 체크
        /// </summary>
        /// <param name="requireColumns"></param>
        /// <returns></returns>
        public bool CheckRequireColumn(params string[] requireColumns)
        {
            bool result = false;
            foreach (DataGridViewRow row in this.Rows)
            {
                if ("INS".Equals(row.Cells["row_flag"].Value))
                {
                    foreach (string columnName in requireColumns)
                    {
                        string value = row.Cells[columnName].Value as String;
                        if (value == "" || value == null)
                        {
                            result = true;
                            break;
                        }

                    }
                }
            }


            return result;
        }

        //사용하지 않음 : 삭제 예정
        public bool CheckRequireKey()
        {
            bool result = false;

            if (this.bindDataTable != null)
            {
                if (this.bindDataTable.PrimaryKey.Length > 0)
                {
                    DataColumn[] keyColumnArray = this.bindDataTable.PrimaryKey;

                    foreach (DataGridViewRow row in this.Rows)
                    {
                        if ("INS".Equals(row.Cells["row_flag"].Value))
                        {
                            List<object> keyValues = new List<object>();
                            foreach (DataColumn dataColumn in keyColumnArray)
                            {
                                string value = row.Cells[dataColumn.ColumnName].Value as String;
                                if (value != "")
                                {
                                    keyValues.Add(row.Cells[dataColumn.ColumnName].Value);
                                }

                            }

                            if (keyColumnArray.Length != keyValues.Count)
                            {
                                result = true;
                                break;
                            }
                        }

                    }
                }
            }

            return result;
        }

        /// <summary>
        /// 행 추가 메소드
        /// 맨 끝행으로 추가
        /// </summary>
        /// <returns></returns>
        public int AddRow()
        {
            int rowIndex = this.Rows.Add();
            if (this.Columns.Contains("row_flag"))
            {
                this.Rows[rowIndex].Cells["row_flag"].Value = "INS";
            }

            return rowIndex;
        }

        /// <summary>
        /// 행 삽입 메소드
        /// 현재 행의 다음행으로 삽입
        /// </summary>
        /// <returns></returns>
        public int InsertRow()
        {
            this.Rows.Insert(this.CurrentRow.Index + 1, 1);
            if (this.Columns.Contains("row_flag"))
            {
                this.Rows[this.CurrentRow.Index + 1].Cells["row_flag"].Value = "INS";
            }

            return this.CurrentRow.Index + 1;
        }

        /// <summary>
        /// 전체 행 삭제 메소드
        /// </summary>
        public void RemoveAll()
        {
            try
            {
                while (this.Rows.Count > 0)
                {
                    if (!this.Rows[0].IsNewRow)
                        this.Rows.RemoveAt(0);
                }
            }
            catch
            {
            }
        }

        /// <summary>
        /// 행 삭제 메소드
        /// </summary>
        public void RemoveRow()
        {
            //현재행이 추가행일 경우 행을 삭제 
            if ("INS".Equals(this.CurrentRow.Cells["row_flag"].Value))
            {
                this.Rows.Remove(this.CurrentRow);
            }//현재행이 삭제행일 경우 행상태를 원복 
            else if ("DEL".Equals(this.CurrentRow.Cells["row_flag"].Value))
            {
                this.CurrentRow.Cells["row_flag"].Value = null;
            }
            else //현재행이 수정 또는 기타일 경우 삭제행으로 표시 
            {
                this.CurrentRow.Cells["row_flag"].Value = "DEL";
            }
        }

        /// <summary>
        /// 행을 수정시 행상태를 변경하는 이벤트
        /// </summary>
        /// <param name="e"></param>
        protected override void OnCellValueChanged(DataGridViewCellEventArgs e)
        {
            base.OnCellValueChanged(e);

            if (isBind)
            {
                if (e.ColumnIndex < this.Columns.Count && e.RowIndex > -1 && e.RowIndex < this.Rows.Count)
                {
                    DataGridViewRow row = this.Rows[e.RowIndex];
                    if (this.Columns[e.ColumnIndex].Name != "row_flag"
                        && this.Columns[e.ColumnIndex].Name != "row_check"
                        && this.Columns[e.ColumnIndex].Name != "row_index"
                        && !"INS".Equals(this.Rows[e.RowIndex].Cells["row_flag"].Value)
                        && !"DEL".Equals(this.Rows[e.RowIndex].Cells["row_flag"].Value)
                        && !"UPD".Equals(this.Rows[e.RowIndex].Cells["row_flag"].Value))
                    {
                        this.Rows[e.RowIndex].Cells["row_flag"].Value = "UPD";

                    }

                }
            }
        }

        /// <summary>
        /// 행번호를 정렬하기 위해 셀이 그려질때의 이벤트 처리
        /// </summary>
        /// <param name="e"></param>
        protected override void OnRowPostPaint(DataGridViewRowPostPaintEventArgs e)
        {
            base.OnRowPostPaint(e);

            if (isBind && this.Columns.Contains("row_index"))
            {
                this.Rows[e.RowIndex].Cells["row_index"].Value = (e.RowIndex + 1).ToString();
            }
        }

        public void SetGridHeader(bool readOnly, string[] headerText, string[] columnName, string[] columnType, int[] columnWidth, string[] cellAlign, bool[] visible, bool[] disabled)
        {
            this.AllowUserToAddRows = false;
            this.AllowUserToDeleteRows = false;
            this.AllowUserToResizeRows = false;
            //this.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            this.EditMode = DataGridViewEditMode.EditOnEnter;

            if (this.Columns.Count > 0)
            {
                try
                {
                    this.Columns.Clear();
                }
                catch { }
            }
            for (int n = 0; n < headerText.Length; n++)
            {
                DataGridViewColumn dataGridViewColumn = null;
                if (columnType != null)
                {
                    if (columnType[n] == "T")
                    {
                        dataGridViewColumn = new DataGridViewTextBoxColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.Automatic;

                    }
                    else if (columnType[n] == "S")
                    {
                        dataGridViewColumn = new DataGridViewComboBoxColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
                        //dataGridViewColumn.DataPropertyName = "";
                    }
                    else if (columnType[n] == "I")
                    {
                        dataGridViewColumn = new DataGridViewImageColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
                    }
                    else if (columnType[n] == "L")
                    {
                        dataGridViewColumn = new DataGridViewLinkColumn();
                    }
                    else if (columnType[n] == "C")
                    {
                        dataGridViewColumn = new DataGridViewCheckBoxColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
                        dataGridViewColumn.Tag = false;
                    }
                }
                else
                {
                    dataGridViewColumn = new DataGridViewTextBoxColumn();
                }

                if (columnName != null)
                {
                    dataGridViewColumn.DataPropertyName = columnName[n];
                }

                if (columnWidth != null)
                {
                    dataGridViewColumn.Width = columnWidth[n];
                }

                if (headerText != null)
                {
                    dataGridViewColumn.Name = headerText[n];
                    dataGridViewColumn.HeaderText = headerText[n];
                }

                if (visible != null)
                {
                    dataGridViewColumn.Visible = visible[n];
                }

                if (disabled != null)
                {
                    dataGridViewColumn.ReadOnly = disabled[n];
                }
                else
                {
                    dataGridViewColumn.ReadOnly = readOnly;
                }

                if (cellAlign != null)
                {
                    if (cellAlign[n] == "L")
                    {
                        dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleLeft;
                    }
                    else if (cellAlign[n] == "C")
                    {
                        dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                    }
                    else if (cellAlign[n] == "R")
                    {
                        dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleRight;
                    }
                }
                else
                {
                    dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                }

                dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;

                DataGridViewCellStyle cellStyle = new DataGridViewCellStyle();
                //cellStyle.Font = new Font("맑은고딕", 16, FontStyle.Bold);
                cellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                dataGridViewColumn.HeaderCell.Style = cellStyle;

                dataGridViewColumn.DisplayIndex = n;
                this.Columns.Add(dataGridViewColumn);


            }
        }

        public void SetGridHeader(bool readOnly, string[] headerText, string[] columnName, string[] columnType, int[] columnWidth, string[] cellAlign, bool[] visible, bool[] disabled, DataTable messageDt, string language)
        {
            this.AllowUserToAddRows = false;
            this.AllowUserToDeleteRows = false;
            this.AllowUserToResizeRows = false;
            //this.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
            this.EditMode = DataGridViewEditMode.EditOnEnter;

            if (this.Columns.Count > 0)
            {
                try
                {
                    this.Columns.Clear();
                }
                catch { }
            }
            for (int n = 0; n < headerText.Length; n++)
            {
                DataGridViewColumn dataGridViewColumn = null;
                if (columnType != null)
                {
                    if (columnType[n] == "T")
                    {
                        dataGridViewColumn = new DataGridViewTextBoxColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.Automatic;
                    }
                    else if (columnType[n] == "S")
                    {
                        dataGridViewColumn = new DataGridViewComboBoxColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
                        //dataGridViewColumn.DataPropertyName = "";
                    }
                    else if (columnType[n] == "I")
                    {
                        dataGridViewColumn = new DataGridViewImageColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
                    }
                    else if (columnType[n] == "L")
                    {
                        dataGridViewColumn = new DataGridViewLinkColumn();
                    }
                    else if (columnType[n] == "C")
                    {
                        dataGridViewColumn = new DataGridViewCheckBoxColumn();
                        dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
                        dataGridViewColumn.Tag = false;
                    }
                }
                else
                {
                    dataGridViewColumn = new DataGridViewTextBoxColumn();
                }

                if (columnName != null)
                {
                    dataGridViewColumn.DataPropertyName = columnName[n];
                }

                if (columnWidth != null)
                {
                    dataGridViewColumn.Width = columnWidth[n];
                }

                if (headerText != null)
                {
                    dataGridViewColumn.Name = headerText[n];
                    dataGridViewColumn.HeaderText = message_load(headerText[n], ref messageDt, language);
                }

                if (visible != null)
                {
                    dataGridViewColumn.Visible = visible[n];
                }

                if (disabled != null)
                {
                    dataGridViewColumn.ReadOnly = disabled[n];
                }
                else
                {
                    dataGridViewColumn.ReadOnly = readOnly;
                }

                if (cellAlign != null)
                {
                    if (cellAlign[n] == "L")
                    {
                        dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleLeft;
                    }
                    else if (cellAlign[n] == "C")
                    {
                        dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                    }
                    else if (cellAlign[n] == "R")
                    {
                        dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleRight;
                    }
                }
                else
                {
                    dataGridViewColumn.DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                }

                dataGridViewColumn.SortMode = DataGridViewColumnSortMode.NotSortable;

                DataGridViewCellStyle cellStyle = new DataGridViewCellStyle();
                cellStyle.Alignment = DataGridViewContentAlignment.MiddleCenter;
                dataGridViewColumn.HeaderCell.Style = cellStyle;

                dataGridViewColumn.DisplayIndex = n;
                this.Columns.Add(dataGridViewColumn);


            }
        }

        private string message_load(string fieldText, ref DataTable messageDt, string language)
        {
            string retbuf = "";

            if (messageDt.Rows.Count > 0)
            {
                DataRow[] drs = messageDt.Select("KR = '" + fieldText + "' OR EN = '" + fieldText + "' OR CH = '" + fieldText + "'");

                if (drs.Length == 0)
                {
                    retbuf = fieldText;
                }
                else
                {
                    retbuf = drs[0][language].ToString();
                }
            }
            else
            {
                retbuf = fieldText;
            }


            return retbuf;
        }
    }


}
