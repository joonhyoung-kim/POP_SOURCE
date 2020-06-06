﻿namespace SmartMOM_POP
{
    partial class frmPallet
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
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle5 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle6 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.grdPallet = new SmartMom_Lib.ExGrid();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.lblMessage = new System.Windows.Forms.Label();
            this.btnSet = new System.Windows.Forms.Button();
            this.txtSN = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.lblItem = new System.Windows.Forms.Label();
            this.lblProductOrder = new System.Windows.Forms.Label();
            this.btnInit = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.lblPallet = new System.Windows.Forms.Label();
            this.lblQty = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.lblFrom = new System.Windows.Forms.Label();
            this.lblTo = new System.Windows.Forms.Label();
            this.lblSpec = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel();
            this.btnPalletInit = new System.Windows.Forms.Button();
            this.btnLabelPrint = new System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdPallet)).BeginInit();
            this.tableLayoutPanel2.SuspendLayout();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.grdPallet, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.tableLayoutPanel2, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 250F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 104F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1280, 1024);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // grdPallet
            // 
            this.grdPallet.AllowUserToAddRows = false;
            this.grdPallet.AllowUserToResizeRows = false;
            this.grdPallet.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdPallet.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdPallet.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdPallet.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdPallet.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle4;
            this.grdPallet.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.grdPallet.Data = null;
            dataGridViewCellStyle5.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle5.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle5.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdPallet.DefaultCellStyle = dataGridViewCellStyle5;
            this.grdPallet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdPallet.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdPallet.EnableHeadersVisualStyles = false;
            this.grdPallet.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdPallet.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdPallet.LanguageCategory = null;
            this.grdPallet.LanguageCode = null;
            this.grdPallet.Location = new System.Drawing.Point(3, 253);
            this.grdPallet.Name = "grdPallet";
            this.grdPallet.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle6.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle6.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle6.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle6.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle6.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdPallet.RowHeadersDefaultCellStyle = dataGridViewCellStyle6;
            this.grdPallet.RowHeadersVisible = false;
            this.grdPallet.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdPallet.RowTemplate.Height = 23;
            this.grdPallet.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdPallet.Size = new System.Drawing.Size(1274, 664);
            this.grdPallet.TabIndex = 2;
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Single;
            this.tableLayoutPanel2.ColumnCount = 10;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 131F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 337F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 69F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 96F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 193F));
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 192F));
            this.tableLayoutPanel2.Controls.Add(this.lblMessage, 0, 1);
            this.tableLayoutPanel2.Controls.Add(this.btnSet, 0, 3);
            this.tableLayoutPanel2.Controls.Add(this.txtSN, 1, 3);
            this.tableLayoutPanel2.Controls.Add(this.label2, 0, 2);
            this.tableLayoutPanel2.Controls.Add(this.lblItem, 2, 2);
            this.tableLayoutPanel2.Controls.Add(this.lblProductOrder, 2, 1);
            this.tableLayoutPanel2.Controls.Add(this.btnInit, 8, 3);
            this.tableLayoutPanel2.Controls.Add(this.btnClose, 9, 3);
            this.tableLayoutPanel2.Controls.Add(this.lblPallet, 7, 1);
            this.tableLayoutPanel2.Controls.Add(this.lblQty, 7, 2);
            this.tableLayoutPanel2.Controls.Add(this.label1, 5, 1);
            this.tableLayoutPanel2.Controls.Add(this.label3, 5, 2);
            this.tableLayoutPanel2.Controls.Add(this.label4, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.label5, 5, 0);
            this.tableLayoutPanel2.Controls.Add(this.lblFrom, 2, 0);
            this.tableLayoutPanel2.Controls.Add(this.lblTo, 7, 0);
            this.tableLayoutPanel2.Controls.Add(this.lblSpec, 9, 2);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(1, 1);
            this.tableLayoutPanel2.Margin = new System.Windows.Forms.Padding(1);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 4;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 32.27177F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 32.27499F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 35.45324F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 87F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(1278, 248);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // lblMessage
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.lblMessage, 2);
            this.lblMessage.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblMessage.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblMessage.Location = new System.Drawing.Point(2, 53);
            this.lblMessage.Margin = new System.Windows.Forms.Padding(1);
            this.lblMessage.Name = "lblMessage";
            this.lblMessage.Size = new System.Drawing.Size(204, 48);
            this.lblMessage.TabIndex = 9;
            this.lblMessage.Text = "고객사P/O";
            this.lblMessage.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // btnSet
            // 
            this.btnSet.BackColor = System.Drawing.Color.Silver;
            this.btnSet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSet.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnSet.ForeColor = System.Drawing.Color.Red;
            this.btnSet.Location = new System.Drawing.Point(1, 159);
            this.btnSet.Margin = new System.Windows.Forms.Padding(0);
            this.btnSet.Name = "btnSet";
            this.btnSet.Size = new System.Drawing.Size(131, 88);
            this.btnSet.TabIndex = 2;
            this.btnSet.Text = "Set";
            this.btnSet.UseVisualStyleBackColor = false;
            this.btnSet.Click += new System.EventHandler(this.btnSet_Click);
            // 
            // txtSN
            // 
            this.txtSN.BackColor = System.Drawing.Color.Red;
            this.txtSN.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtSN.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.tableLayoutPanel2.SetColumnSpan(this.txtSN, 7);
            this.txtSN.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSN.Font = new System.Drawing.Font("맑은 고딕", 48F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.txtSN.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.txtSN.Location = new System.Drawing.Point(134, 160);
            this.txtSN.Margin = new System.Windows.Forms.Padding(1);
            this.txtSN.Name = "txtSN";
            this.txtSN.Size = new System.Drawing.Size(752, 86);
            this.txtSN.TabIndex = 6;
            this.txtSN.MouseClick += new System.Windows.Forms.MouseEventHandler(this.txtSN_MouseClick);
            this.txtSN.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtSN_KeyDown);
            this.txtSN.Leave += new System.EventHandler(this.txtSN_Leave);
            // 
            // label2
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.label2, 2);
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label2.Location = new System.Drawing.Point(2, 104);
            this.label2.Margin = new System.Windows.Forms.Padding(1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(204, 53);
            this.label2.TabIndex = 9;
            this.label2.Text = "Item";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblItem
            // 
            this.lblItem.BackColor = System.Drawing.Color.White;
            this.tableLayoutPanel2.SetColumnSpan(this.lblItem, 3);
            this.lblItem.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblItem.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblItem.Location = new System.Drawing.Point(209, 104);
            this.lblItem.Margin = new System.Windows.Forms.Padding(1);
            this.lblItem.Name = "lblItem";
            this.lblItem.Size = new System.Drawing.Size(455, 53);
            this.lblItem.TabIndex = 8;
            this.lblItem.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblProductOrder
            // 
            this.lblProductOrder.BackColor = System.Drawing.Color.White;
            this.tableLayoutPanel2.SetColumnSpan(this.lblProductOrder, 3);
            this.lblProductOrder.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblProductOrder.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblProductOrder.Location = new System.Drawing.Point(209, 53);
            this.lblProductOrder.Margin = new System.Windows.Forms.Padding(1);
            this.lblProductOrder.Name = "lblProductOrder";
            this.lblProductOrder.Size = new System.Drawing.Size(455, 48);
            this.lblProductOrder.TabIndex = 8;
            this.lblProductOrder.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // btnInit
            // 
            this.btnInit.BackColor = System.Drawing.Color.Silver;
            this.btnInit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnInit.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnInit.Font = new System.Drawing.Font("맑은 고딕", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnInit.ForeColor = System.Drawing.Color.Black;
            this.btnInit.Location = new System.Drawing.Point(888, 159);
            this.btnInit.Margin = new System.Windows.Forms.Padding(0);
            this.btnInit.Name = "btnInit";
            this.btnInit.Size = new System.Drawing.Size(193, 88);
            this.btnInit.TabIndex = 2;
            this.btnInit.Text = "화면 초기화";
            this.btnInit.UseVisualStyleBackColor = false;
            this.btnInit.Click += new System.EventHandler(this.btnInit_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.Silver;
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.Red;
            this.btnClose.Location = new System.Drawing.Point(1082, 159);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(195, 88);
            this.btnClose.TabIndex = 2;
            this.btnClose.Text = "닫기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // lblPallet
            // 
            this.lblPallet.BackColor = System.Drawing.Color.White;
            this.tableLayoutPanel2.SetColumnSpan(this.lblPallet, 3);
            this.lblPallet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblPallet.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblPallet.Location = new System.Drawing.Point(839, 53);
            this.lblPallet.Margin = new System.Windows.Forms.Padding(1);
            this.lblPallet.Name = "lblPallet";
            this.lblPallet.Size = new System.Drawing.Size(437, 48);
            this.lblPallet.TabIndex = 8;
            this.lblPallet.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblQty
            // 
            this.lblQty.BackColor = System.Drawing.Color.White;
            this.tableLayoutPanel2.SetColumnSpan(this.lblQty, 2);
            this.lblQty.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblQty.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblQty.Location = new System.Drawing.Point(839, 104);
            this.lblQty.Margin = new System.Windows.Forms.Padding(1);
            this.lblQty.Name = "lblQty";
            this.lblQty.Size = new System.Drawing.Size(241, 53);
            this.lblQty.TabIndex = 8;
            this.lblQty.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // label1
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.label1, 2);
            this.label1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label1.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label1.Location = new System.Drawing.Point(667, 53);
            this.label1.Margin = new System.Windows.Forms.Padding(1);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(169, 48);
            this.label1.TabIndex = 9;
            this.label1.Text = "Pallet번호";
            this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label3
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.label3, 2);
            this.label3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label3.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label3.Location = new System.Drawing.Point(667, 104);
            this.label3.Margin = new System.Windows.Forms.Padding(1);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(169, 53);
            this.label3.TabIndex = 9;
            this.label3.Text = "Qty";
            this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label4
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.label4, 2);
            this.label4.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label4.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label4.Location = new System.Drawing.Point(2, 2);
            this.label4.Margin = new System.Windows.Forms.Padding(1);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(204, 48);
            this.label4.TabIndex = 9;
            this.label4.Text = "From";
            this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // label5
            // 
            this.tableLayoutPanel2.SetColumnSpan(this.label5, 2);
            this.label5.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label5.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.label5.Location = new System.Drawing.Point(667, 2);
            this.label5.Margin = new System.Windows.Forms.Padding(1);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(169, 48);
            this.label5.TabIndex = 9;
            this.label5.Text = "To";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // lblFrom
            // 
            this.lblFrom.BackColor = System.Drawing.Color.White;
            this.tableLayoutPanel2.SetColumnSpan(this.lblFrom, 3);
            this.lblFrom.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblFrom.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblFrom.Location = new System.Drawing.Point(209, 2);
            this.lblFrom.Margin = new System.Windows.Forms.Padding(1);
            this.lblFrom.Name = "lblFrom";
            this.lblFrom.Size = new System.Drawing.Size(455, 48);
            this.lblFrom.TabIndex = 8;
            this.lblFrom.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblTo
            // 
            this.lblTo.BackColor = System.Drawing.Color.White;
            this.tableLayoutPanel2.SetColumnSpan(this.lblTo, 3);
            this.lblTo.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblTo.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblTo.Location = new System.Drawing.Point(839, 2);
            this.lblTo.Margin = new System.Windows.Forms.Padding(1);
            this.lblTo.Name = "lblTo";
            this.lblTo.Size = new System.Drawing.Size(437, 48);
            this.lblTo.TabIndex = 8;
            this.lblTo.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // lblSpec
            // 
            this.lblSpec.BackColor = System.Drawing.Color.White;
            this.lblSpec.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblSpec.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.lblSpec.Location = new System.Drawing.Point(1083, 104);
            this.lblSpec.Margin = new System.Windows.Forms.Padding(1);
            this.lblSpec.Name = "lblSpec";
            this.lblSpec.Size = new System.Drawing.Size(193, 53);
            this.lblSpec.TabIndex = 8;
            this.lblSpec.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.btnPalletInit);
            this.panel1.Controls.Add(this.btnLabelPrint);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 920);
            this.panel1.Margin = new System.Windows.Forms.Padding(0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(1280, 104);
            this.panel1.TabIndex = 3;
            // 
            // btnPalletInit
            // 
            this.btnPalletInit.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnPalletInit.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(192)))), ((int)(((byte)(0)))));
            this.btnPalletInit.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPalletInit.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPalletInit.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(0)))), ((int)(((byte)(0)))));
            this.btnPalletInit.Location = new System.Drawing.Point(886, 3);
            this.btnPalletInit.Margin = new System.Windows.Forms.Padding(0);
            this.btnPalletInit.Name = "btnPalletInit";
            this.btnPalletInit.Size = new System.Drawing.Size(385, 93);
            this.btnPalletInit.TabIndex = 3;
            this.btnPalletInit.Text = "팔레트 삭제";
            this.btnPalletInit.UseVisualStyleBackColor = false;
            this.btnPalletInit.Click += new System.EventHandler(this.btnPalletInit_Click);
            // 
            // btnLabelPrint
            // 
            this.btnLabelPrint.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnLabelPrint.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnLabelPrint.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnLabelPrint.ForeColor = System.Drawing.Color.Black;
            this.btnLabelPrint.Location = new System.Drawing.Point(6, 3);
            this.btnLabelPrint.Margin = new System.Windows.Forms.Padding(0);
            this.btnLabelPrint.Name = "btnLabelPrint";
            this.btnLabelPrint.Size = new System.Drawing.Size(521, 93);
            this.btnLabelPrint.TabIndex = 2;
            this.btnLabelPrint.Text = "팔레트 라벨 발행";
            this.btnLabelPrint.UseVisualStyleBackColor = false;
            this.btnLabelPrint.Click += new System.EventHandler(this.btnLabelPrint_Click);
            // 
            // frmPallet
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 1024);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmPallet";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "파레트 구성";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.grdPallet)).EndInit();
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel2.PerformLayout();
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel2;
        private System.Windows.Forms.TextBox txtSN;
        private System.Windows.Forms.Label lblItem;
        private System.Windows.Forms.Label lblQty;
        private SmartMom_Lib.ExGrid grdPallet;
        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnLabelPrint;
        private System.Windows.Forms.Label lblPallet;
        private System.Windows.Forms.Button btnInit;
        private System.Windows.Forms.Label lblProductOrder;
        private System.Windows.Forms.Button btnSet;
        private System.Windows.Forms.Button btnPalletInit;
        private System.Windows.Forms.Label lblMessage;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label lblFrom;
        private System.Windows.Forms.Label lblTo;
        private System.Windows.Forms.Label lblSpec;
    }
}