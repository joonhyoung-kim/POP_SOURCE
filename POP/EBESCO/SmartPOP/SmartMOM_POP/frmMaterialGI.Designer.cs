using System.Windows.Forms;

namespace SmartMOM_POP
{
    partial class frmMaterialGI
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.grdMain = new SmartMom_Lib.ExGrid();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnListSearch = new System.Windows.Forms.Button();
            this.lblFromStock = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.lblNowdate = new System.Windows.Forms.Label();
            this.txtSN = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label();
            this.comboLine = new System.Windows.Forms.ComboBox();
            this.btnSet = new System.Windows.Forms.Button();
            this.tableLayoutPanel3 = new System.Windows.Forms.TableLayoutPanel();
            this.label5 = new System.Windows.Forms.Label();
            this.lblMessage = new System.Windows.Forms.Label();
            this.lblQty = new System.Windows.Forms.Label();
            this.lblItem = new System.Windows.Forms.Label();
            this.btnInput = new System.Windows.Forms.Button();
            this.tableLayoutPanel4 = new System.Windows.Forms.TableLayoutPanel();
            this.btnGanbanSplit = new System.Windows.Forms.Button();
            this.btnGanbanManual = new System.Windows.Forms.Button();
            this.btnGI = new System.Windows.Forms.Button();
            this.btnScanList = new System.Windows.Forms.Button();
            this.btnPageInit = new System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdMain)).BeginInit();
            this.tableLayoutPanel2.SuspendLayout();
            this.tableLayoutPanel3.SuspendLayout();
            this.tableLayoutPanel4.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.grdMain, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel2, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel3, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel4, 0, 3);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 4;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 188F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 88F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 88F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1920, 1080);
            this.tableLayoutPanel1.TabIndex = 3;
            // 
            // grdMain
            // 
            this.grdMain.AllowUserToAddRows = false;
            this.grdMain.AllowUserToResizeRows = false;
            this.grdMain.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdMain.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdMain.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdMain.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle1.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdMain.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.grdMain.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdMain.Data = null;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle2.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdMain.DefaultCellStyle = dataGridViewCellStyle2;
            this.grdMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdMain.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdMain.EnableHeadersVisualStyles = false;
            this.grdMain.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdMain.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdMain.LanguageCategory = null;
            this.grdMain.LanguageCode = null;
            this.grdMain.Location = new System.Drawing.Point(3, 191);
            this.grdMain.Name = "grdMain";
            this.grdMain.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle3.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdMain.RowHeadersDefaultCellStyle = dataGridViewCellStyle3;
            this.grdMain.RowHeadersVisible = false;
            this.grdMain.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdMain.RowTemplate.Height = 23;
            this.grdMain.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdMain.Size = new System.Drawing.Size(1914, 710);
            this.grdMain.TabIndex = 2;
            this.grdMain.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.grdMain_CellClick);
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel2.ColumnCount = 5;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 170F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 35F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 170F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 35F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30F));
            this.tableLayoutPanel2.Controls.Add(this.btnClose, 4, 0);
            this.tableLayoutPanel2.Controls.Add(this.btnListSearch, 4, 1);
            this.tableLayoutPanel2.Controls.Add(this.lblFromStock, 1, 1);
            this.tableLayoutPanel2.Controls.Add(this.label1, 0, 1);
            this.tableLayoutPanel2.Controls.Add(this.label4, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.lblNowdate, 1, 0);
            this.tableLayoutPanel2.Controls.Add(this.txtSN, 1, 2);
            this.tableLayoutPanel2.Controls.Add(this.label6, 2, 0);
            this.tableLayoutPanel2.Controls.Add(this.comboLine, 3, 0);
            this.tableLayoutPanel2.Controls.Add(this.btnSet, 0, 2);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 3;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(1920, 188);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.Silver;
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.Red;
            this.btnClose.Location = new System.Drawing.Point(1445, 1);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(474, 60);
            this.btnClose.TabIndex = 2;
            this.btnClose.Text = "닫기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnListSearch
            // 
            this.btnListSearch.BackColor = System.Drawing.Color.Silver;
            this.btnListSearch.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnListSearch.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnListSearch.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnListSearch.ForeColor = System.Drawing.Color.Black;
            this.btnListSearch.Location = new System.Drawing.Point(1445, 62);
            this.btnListSearch.Margin = new System.Windows.Forms.Padding(0);
            this.btnListSearch.Name = "btnListSearch";
            this.tableLayoutPanel2.SetRowSpan(this.btnListSearch, 2);
            this.btnListSearch.Size = new System.Drawing.Size(474, 125);
            this.btnListSearch.TabIndex = 2;
            this.btnListSearch.Text = "불출리스트조회";
            this.btnListSearch.UseVisualStyleBackColor = false;
            this.btnListSearch.Click += new System.EventHandler(this.btnListSearch_Click);
            // 
            // lblFromStock
            // 
            this.lblFromStock.BackColor = System.Drawing.Color.Gainsboro;
            this.tableLayoutPanel2.SetColumnSpan(this.lblFromStock, 3);
            this.lblFromStock.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblFromStock.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblFromStock.Location = new System.Drawing.Point(173, 63);
            this.lblFromStock.Margin = new System.Windows.Forms.Padding(1);
            this.lblFromStock.Name = "lblFromStock";
            this.lblFromStock.Size = new System.Drawing.Size(1270, 58);
            this.lblFromStock.TabIndex = 8;
            this.lblFromStock.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label1
            // 
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.Location = new System.Drawing.Point(2, 63);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(168, 58);
            this.label1.TabIndex = 12;
            this.label1.Text = "불출창고";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label4
            // 
            this.label4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label4.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label4.Location = new System.Drawing.Point(2, 2);
            this.label4.Margin = new System.Windows.Forms.Padding(1);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(168, 58);
            this.label4.TabIndex = 12;
            this.label4.Text = "불출일자";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblNowdate
            // 
            this.lblNowdate.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.lblNowdate.Cursor = System.Windows.Forms.Cursors.Hand;
            this.lblNowdate.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblNowdate.Font = new System.Drawing.Font("맑은 고딕", 27.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblNowdate.Location = new System.Drawing.Point(173, 2);
            this.lblNowdate.Margin = new System.Windows.Forms.Padding(1);
            this.lblNowdate.Name = "lblNowdate";
            this.lblNowdate.Size = new System.Drawing.Size(548, 58);
            this.lblNowdate.TabIndex = 8;
            this.lblNowdate.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblNowdate.Click += new System.EventHandler(this.lblNowdate_Click);
            // 
            // txtSN
            // 
            this.txtSN.BackColor = System.Drawing.Color.Red;
            this.txtSN.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtSN.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.tableLayoutPanel2.SetColumnSpan(this.txtSN, 3);
            this.txtSN.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSN.Font = new System.Drawing.Font("맑은 고딕", 35F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.txtSN.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.txtSN.Location = new System.Drawing.Point(173, 124);
            this.txtSN.Margin = new System.Windows.Forms.Padding(1);
            this.txtSN.Name = "txtSN";
            this.txtSN.Size = new System.Drawing.Size(1270, 63);
            this.txtSN.TabIndex = 1;
            this.txtSN.MouseClick += new System.Windows.Forms.MouseEventHandler(this.txtSN_MouseClick);
            this.txtSN.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtSN_KeyDown);
            this.txtSN.Leave += new System.EventHandler(this.txtSN_Leave);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label6.Font = new System.Drawing.Font("맑은 고딕", 30F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label6.Location = new System.Drawing.Point(726, 1);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(164, 60);
            this.label6.TabIndex = 14;
            this.label6.Text = "TO";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // comboLine
            // 
            this.comboLine.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.comboLine.Dock = System.Windows.Forms.DockStyle.Fill;
            this.comboLine.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboLine.Font = new System.Drawing.Font("맑은 고딕", 29F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.comboLine.FormattingEnabled = true;
            this.comboLine.Location = new System.Drawing.Point(894, 1);
            this.comboLine.Margin = new System.Windows.Forms.Padding(0);
            this.comboLine.Name = "comboLine";
            this.comboLine.Size = new System.Drawing.Size(550, 60);
            this.comboLine.TabIndex = 15;
            // 
            // btnSet
            // 
            this.btnSet.BackColor = System.Drawing.Color.Silver;
            this.btnSet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSet.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnSet.ForeColor = System.Drawing.Color.Red;
            this.btnSet.Location = new System.Drawing.Point(1, 123);
            this.btnSet.Margin = new System.Windows.Forms.Padding(0);
            this.btnSet.Name = "btnSet";
            this.btnSet.Size = new System.Drawing.Size(170, 64);
            this.btnSet.TabIndex = 16;
            this.btnSet.Text = "Set";
            this.btnSet.UseVisualStyleBackColor = false;
            this.btnSet.Click += new System.EventHandler(this.btnSet_Click);
            // 
            // tableLayoutPanel3
            // 
            this.tableLayoutPanel3.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel3.ColumnCount = 5;
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 180F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 40F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 180F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30F));
            this.tableLayoutPanel3.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30F));
            this.tableLayoutPanel3.Controls.Add(this.label5, 2, 0);
            this.tableLayoutPanel3.Controls.Add(this.lblMessage, 0, 0);
            this.tableLayoutPanel3.Controls.Add(this.lblQty, 3, 0);
            this.tableLayoutPanel3.Controls.Add(this.lblItem, 1, 0);
            this.tableLayoutPanel3.Controls.Add(this.btnInput, 4, 0);
            this.tableLayoutPanel3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel3.Location = new System.Drawing.Point(3, 907);
            this.tableLayoutPanel3.Name = "tableLayoutPanel3";
            this.tableLayoutPanel3.RowCount = 1;
            this.tableLayoutPanel3.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel3.Size = new System.Drawing.Size(1914, 82);
            this.tableLayoutPanel3.TabIndex = 4;
            // 
            // label5
            // 
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 29F, System.Drawing.FontStyle.Bold);
            this.label5.Location = new System.Drawing.Point(803, 2);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(178, 78);
            this.label5.TabIndex = 11;
            this.label5.Text = "불출수량";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblMessage
            // 
            this.lblMessage.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblMessage.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold);
            this.lblMessage.Location = new System.Drawing.Point(2, 2);
            this.lblMessage.Margin = new System.Windows.Forms.Padding(1);
            this.lblMessage.Name = "lblMessage";
            this.lblMessage.Size = new System.Drawing.Size(178, 78);
            this.lblMessage.TabIndex = 12;
            this.lblMessage.Text = "품목";
            this.lblMessage.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.lblMessage.Click += new System.EventHandler(this.lblMessage_Click);
            // 
            // lblQty
            // 
            this.lblQty.BackColor = System.Drawing.Color.PeachPuff;
            this.lblQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblQty.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblQty.Location = new System.Drawing.Point(984, 2);
            this.lblQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblQty.Name = "lblQty";
            this.lblQty.Size = new System.Drawing.Size(462, 78);
            this.lblQty.TabIndex = 12;
            this.lblQty.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // lblItem
            // 
            this.lblItem.BackColor = System.Drawing.Color.PeachPuff;
            this.lblItem.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItem.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblItem.Location = new System.Drawing.Point(183, 2);
            this.lblItem.Margin = new System.Windows.Forms.Padding(1);
            this.lblItem.Name = "lblItem";
            this.lblItem.Size = new System.Drawing.Size(617, 78);
            this.lblItem.TabIndex = 12;
            this.lblItem.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // btnInput
            // 
            this.btnInput.BackColor = System.Drawing.Color.Silver;
            this.btnInput.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnInput.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnInput.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnInput.ForeColor = System.Drawing.Color.Black;
            this.btnInput.Location = new System.Drawing.Point(1448, 1);
            this.btnInput.Margin = new System.Windows.Forms.Padding(0);
            this.btnInput.Name = "btnInput";
            this.btnInput.Size = new System.Drawing.Size(465, 80);
            this.btnInput.TabIndex = 9;
            this.btnInput.Text = "수동수량입력";
            this.btnInput.UseVisualStyleBackColor = false;
            this.btnInput.Click += new System.EventHandler(this.btnInput_Click);
            // 
            // tableLayoutPanel4
            // 
            this.tableLayoutPanel4.ColumnCount = 5;
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel4.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel4.Controls.Add(this.btnGanbanSplit, 2, 0);
            this.tableLayoutPanel4.Controls.Add(this.btnGanbanManual, 1, 0);
            this.tableLayoutPanel4.Controls.Add(this.btnGI, 0, 0);
            this.tableLayoutPanel4.Controls.Add(this.btnScanList, 3, 0);
            this.tableLayoutPanel4.Controls.Add(this.btnPageInit, 4, 0);
            this.tableLayoutPanel4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel4.Location = new System.Drawing.Point(0, 992);
            this.tableLayoutPanel4.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanel4.Name = "tableLayoutPanel4";
            this.tableLayoutPanel4.RowCount = 1;
            this.tableLayoutPanel4.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel4.Size = new System.Drawing.Size(1920, 88);
            this.tableLayoutPanel4.TabIndex = 5;
            // 
            // btnGanbanSplit
            // 
            this.btnGanbanSplit.BackColor = System.Drawing.Color.Silver;
            this.btnGanbanSplit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnGanbanSplit.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanbanSplit.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold);
            this.btnGanbanSplit.ForeColor = System.Drawing.Color.Black;
            this.btnGanbanSplit.Location = new System.Drawing.Point(768, 0);
            this.btnGanbanSplit.Margin = new System.Windows.Forms.Padding(0);
            this.btnGanbanSplit.Name = "btnGanbanSplit";
            this.btnGanbanSplit.Size = new System.Drawing.Size(384, 88);
            this.btnGanbanSplit.TabIndex = 9;
            this.btnGanbanSplit.Text = "간판라벨 발행\r\n(Split)";
            this.btnGanbanSplit.UseVisualStyleBackColor = false;
            this.btnGanbanSplit.Click += new System.EventHandler(this.btnManualPrint_Click);
            // 
            // btnGanbanManual
            // 
            this.btnGanbanManual.BackColor = System.Drawing.Color.Silver;
            this.btnGanbanManual.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnGanbanManual.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGanbanManual.Font = new System.Drawing.Font("맑은 고딕", 20F, System.Drawing.FontStyle.Bold);
            this.btnGanbanManual.ForeColor = System.Drawing.Color.Black;
            this.btnGanbanManual.Location = new System.Drawing.Point(384, 0);
            this.btnGanbanManual.Margin = new System.Windows.Forms.Padding(0);
            this.btnGanbanManual.Name = "btnGanbanManual";
            this.btnGanbanManual.Size = new System.Drawing.Size(384, 88);
            this.btnGanbanManual.TabIndex = 10;
            this.btnGanbanManual.Text = "간판라벨발행\r\n(강제생성)";
            this.btnGanbanManual.UseVisualStyleBackColor = false;
            this.btnGanbanManual.Click += new System.EventHandler(this.btnGanbanManual_Click);
            // 
            // btnGI
            // 
            this.btnGI.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnGI.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnGI.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGI.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGI.ForeColor = System.Drawing.Color.Black;
            this.btnGI.Location = new System.Drawing.Point(0, 0);
            this.btnGI.Margin = new System.Windows.Forms.Padding(0);
            this.btnGI.Name = "btnGI";
            this.btnGI.Size = new System.Drawing.Size(384, 88);
            this.btnGI.TabIndex = 2;
            this.btnGI.Text = "불 출";
            this.btnGI.UseVisualStyleBackColor = false;
            this.btnGI.Click += new System.EventHandler(this.btnGI_Click);
            // 
            // btnScanList
            // 
            this.btnScanList.BackColor = System.Drawing.Color.Silver;
            this.btnScanList.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnScanList.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnScanList.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnScanList.ForeColor = System.Drawing.Color.Black;
            this.btnScanList.Location = new System.Drawing.Point(1152, 0);
            this.btnScanList.Margin = new System.Windows.Forms.Padding(0);
            this.btnScanList.Name = "btnScanList";
            this.btnScanList.Size = new System.Drawing.Size(384, 88);
            this.btnScanList.TabIndex = 2;
            this.btnScanList.Text = "스캔리스트";
            this.btnScanList.UseVisualStyleBackColor = false;
            this.btnScanList.Click += new System.EventHandler(this.btnScanList_Click);
            // 
            // btnPageInit
            // 
            this.btnPageInit.BackColor = System.Drawing.Color.Silver;
            this.btnPageInit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPageInit.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPageInit.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold);
            this.btnPageInit.ForeColor = System.Drawing.Color.Black;
            this.btnPageInit.Location = new System.Drawing.Point(1536, 0);
            this.btnPageInit.Margin = new System.Windows.Forms.Padding(0);
            this.btnPageInit.Name = "btnPageInit";
            this.btnPageInit.Size = new System.Drawing.Size(384, 88);
            this.btnPageInit.TabIndex = 9;
            this.btnPageInit.Text = "화면초기화";
            this.btnPageInit.UseVisualStyleBackColor = false;
            this.btnPageInit.Click += new System.EventHandler(this.btnPageInit_Click);
            // 
            // frmMaterialGI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1920, 1080);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmMaterialGI";
            this.Text = "frmMaterialGI";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.grdMain)).EndInit();
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel2.PerformLayout();
            this.tableLayoutPanel3.ResumeLayout(false);
            this.tableLayoutPanel4.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private SmartMom_Lib.ExGrid grdMain;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.Label lblFromStock;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txtSN;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnListSearch;
        private System.Windows.Forms.Button btnPageInit;
        private System.Windows.Forms.Button btnScanList;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel3;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label lblMessage;
        private System.Windows.Forms.Label lblQty;
        private System.Windows.Forms.Label lblItem;
        private System.Windows.Forms.Button btnInput;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label lblNowdate;
        private System.Windows.Forms.Button btnGI;
        private System.Windows.Forms.Button btnGanbanSplit;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox comboLine;
        private System.Windows.Forms.Button btnSet;
        private System.Windows.Forms.Button btnGanbanManual;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel4;
    }
}