namespace SmartMOM_POP
{
    partial class frmProductGI
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
            this.btnGIDel = new System.Windows.Forms.Button();
            this.btnCancel = new System.Windows.Forms.Button();
            this.btnClose = new System.Windows.Forms.Button();
            this.btnSave = new System.Windows.Forms.Button();
            this.lblMessage = new System.Windows.Forms.Label();
            this.txtSN = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.lblUsername = new System.Windows.Forms.Label();
            this.lblCNTRDate = new System.Windows.Forms.Label();
            this.txtCNTR = new System.Windows.Forms.TextBox();
            this.btnPreCancel = new System.Windows.Forms.Button();
            this.btnSet = new System.Windows.Forms.Button();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.grdGI = new SmartMom_Lib.ExGrid();
            this.lblGIstock = new System.Windows.Forms.Label();
            this.tableLayoutPanel1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdGI)).BeginInit();
            this.SuspendLayout();
            // 
            // btnGIDel
            // 
            this.btnGIDel.BackColor = System.Drawing.Color.Silver;
            this.btnGIDel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnGIDel.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnGIDel.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnGIDel.ForeColor = System.Drawing.Color.Black;
            this.btnGIDel.Location = new System.Drawing.Point(2, 925);
            this.btnGIDel.Margin = new System.Windows.Forms.Padding(0);
            this.btnGIDel.Name = "btnGIDel";
            this.btnGIDel.Size = new System.Drawing.Size(245, 97);
            this.btnGIDel.TabIndex = 3;
            this.btnGIDel.Text = "삭 제";
            this.btnGIDel.UseVisualStyleBackColor = false;
            this.btnGIDel.Click += new System.EventHandler(this.btnGIDel_Click);
            // 
            // btnCancel
            // 
            this.btnCancel.BackColor = System.Drawing.Color.Silver;
            this.btnCancel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnCancel.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnCancel.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnCancel.ForeColor = System.Drawing.Color.Black;
            this.btnCancel.Location = new System.Drawing.Point(249, 925);
            this.btnCancel.Margin = new System.Windows.Forms.Padding(0);
            this.btnCancel.Name = "btnCancel";
            this.btnCancel.Size = new System.Drawing.Size(204, 97);
            this.btnCancel.TabIndex = 3;
            this.btnCancel.Text = "취 소";
            this.btnCancel.UseVisualStyleBackColor = false;
            this.btnCancel.Click += new System.EventHandler(this.btnCancel_Click);
            // 
            // btnClose
            // 
            this.btnClose.BackColor = System.Drawing.Color.Silver;
            this.btnClose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnClose.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnClose.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnClose.ForeColor = System.Drawing.Color.Black;
            this.btnClose.Location = new System.Drawing.Point(1073, 925);
            this.btnClose.Margin = new System.Windows.Forms.Padding(0);
            this.btnClose.Name = "btnClose";
            this.btnClose.Size = new System.Drawing.Size(205, 97);
            this.btnClose.TabIndex = 3;
            this.btnClose.Text = "닫 기";
            this.btnClose.UseVisualStyleBackColor = false;
            this.btnClose.Click += new System.EventHandler(this.btnClose_Click);
            // 
            // btnSave
            // 
            this.btnSave.BackColor = System.Drawing.Color.Silver;
            this.tableLayoutPanel1.SetColumnSpan(this.btnSave, 3);
            this.btnSave.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSave.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSave.Font = new System.Drawing.Font("맑은 고딕", 24F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnSave.ForeColor = System.Drawing.Color.Black;
            this.btnSave.Location = new System.Drawing.Point(455, 925);
            this.btnSave.Margin = new System.Windows.Forms.Padding(0);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(616, 97);
            this.btnSave.TabIndex = 3;
            this.btnSave.Text = "저 장";
            this.btnSave.UseVisualStyleBackColor = false;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // lblMessage
            // 
            this.lblMessage.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblMessage.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold);
            this.lblMessage.Location = new System.Drawing.Point(3, 3);
            this.lblMessage.Margin = new System.Windows.Forms.Padding(1);
            this.lblMessage.Name = "lblMessage";
            this.lblMessage.Size = new System.Drawing.Size(243, 65);
            this.lblMessage.TabIndex = 9;
            this.lblMessage.Text = "출하처리";
            this.lblMessage.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.lblMessage.Click += new System.EventHandler(this.lblMessage_Click);
            // 
            // txtSN
            // 
            this.txtSN.BackColor = System.Drawing.Color.Red;
            this.txtSN.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtSN.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.tableLayoutPanel1.SetColumnSpan(this.txtSN, 4);
            this.txtSN.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtSN.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.txtSN.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.txtSN.Location = new System.Drawing.Point(250, 141);
            this.txtSN.Margin = new System.Windows.Forms.Padding(1);
            this.txtSN.Name = "txtSN";
            this.txtSN.Size = new System.Drawing.Size(820, 64);
            this.txtSN.TabIndex = 6;
            this.txtSN.MouseClick += new System.Windows.Forms.MouseEventHandler(this.txtSN_MouseClick);
            this.txtSN.TextChanged += new System.EventHandler(this.txtSN_TextChanged);
            this.txtSN.KeyDown += new System.Windows.Forms.KeyEventHandler(this.txtSN_KeyDown);
            this.txtSN.Leave += new System.EventHandler(this.txtSN_Leave);
            // 
            // label2
            // 
            this.label2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.label2.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold);
            this.label2.Location = new System.Drawing.Point(3, 72);
            this.label2.Margin = new System.Windows.Forms.Padding(1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(243, 65);
            this.label2.TabIndex = 9;
            this.label2.Text = "차량번호(CNTR)";
            this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.label2.Click += new System.EventHandler(this.label2_Click);
            // 
            // lblUsername
            // 
            this.lblUsername.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblUsername.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold);
            this.lblUsername.Location = new System.Drawing.Point(1074, 3);
            this.lblUsername.Margin = new System.Windows.Forms.Padding(1);
            this.lblUsername.Name = "lblUsername";
            this.lblUsername.Size = new System.Drawing.Size(203, 65);
            this.lblUsername.TabIndex = 9;
            this.lblUsername.Text = "홍길동";
            this.lblUsername.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblUsername.Click += new System.EventHandler(this.lblUsername_Click);
            // 
            // lblCNTRDate
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.lblCNTRDate, 2);
            this.lblCNTRDate.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblCNTRDate.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold);
            this.lblCNTRDate.Location = new System.Drawing.Point(868, 72);
            this.lblCNTRDate.Margin = new System.Windows.Forms.Padding(1);
            this.lblCNTRDate.Name = "lblCNTRDate";
            this.lblCNTRDate.Size = new System.Drawing.Size(409, 65);
            this.lblCNTRDate.TabIndex = 9;
            this.lblCNTRDate.Text = "-";
            this.lblCNTRDate.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblCNTRDate.Click += new System.EventHandler(this.lblCNTRDate_Click);
            // 
            // txtCNTR
            // 
            this.txtCNTR.BackColor = System.Drawing.Color.White;
            this.txtCNTR.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtCNTR.CharacterCasing = System.Windows.Forms.CharacterCasing.Upper;
            this.tableLayoutPanel1.SetColumnSpan(this.txtCNTR, 3);
            this.txtCNTR.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtCNTR.Font = new System.Drawing.Font("맑은 고딕", 36F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.txtCNTR.ForeColor = System.Drawing.Color.Black;
            this.txtCNTR.ImeMode = System.Windows.Forms.ImeMode.Disable;
            this.txtCNTR.Location = new System.Drawing.Point(250, 72);
            this.txtCNTR.Margin = new System.Windows.Forms.Padding(1);
            this.txtCNTR.Name = "txtCNTR";
            this.txtCNTR.Size = new System.Drawing.Size(614, 64);
            this.txtCNTR.TabIndex = 6;
            this.txtCNTR.TextChanged += new System.EventHandler(this.txtCNTR_TextChanged);
            // 
            // btnPreCancel
            // 
            this.btnPreCancel.BackColor = System.Drawing.Color.Silver;
            this.btnPreCancel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnPreCancel.Enabled = false;
            this.btnPreCancel.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnPreCancel.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnPreCancel.ForeColor = System.Drawing.Color.Black;
            this.btnPreCancel.Location = new System.Drawing.Point(1073, 140);
            this.btnPreCancel.Margin = new System.Windows.Forms.Padding(0);
            this.btnPreCancel.Name = "btnPreCancel";
            this.btnPreCancel.Size = new System.Drawing.Size(205, 67);
            this.btnPreCancel.TabIndex = 2;
            this.btnPreCancel.Text = "직전취소";
            this.btnPreCancel.UseVisualStyleBackColor = false;
            this.btnPreCancel.Click += new System.EventHandler(this.btnPreCancel_Click);
            // 
            // btnSet
            // 
            this.btnSet.BackColor = System.Drawing.Color.Silver;
            this.btnSet.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSet.FlatStyle = System.Windows.Forms.FlatStyle.Popup;
            this.btnSet.Font = new System.Drawing.Font("맑은 고딕", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(129)));
            this.btnSet.ForeColor = System.Drawing.Color.Red;
            this.btnSet.Location = new System.Drawing.Point(2, 140);
            this.btnSet.Margin = new System.Windows.Forms.Padding(0);
            this.btnSet.Name = "btnSet";
            this.btnSet.Size = new System.Drawing.Size(245, 67);
            this.btnSet.TabIndex = 2;
            this.btnSet.Text = "Set";
            this.btnSet.UseVisualStyleBackColor = false;
            this.btnSet.Click += new System.EventHandler(this.btnSet_Click);
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.CellBorderStyle = System.Windows.Forms.TableLayoutPanelCellBorderStyle.Inset;
            this.tableLayoutPanel1.ColumnCount = 6;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 19.35484F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.12903F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.12903F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.12903F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.12903F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 16.12903F));
            this.tableLayoutPanel1.Controls.Add(this.grdGI, 0, 3);
            this.tableLayoutPanel1.Controls.Add(this.lblMessage, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.btnClose, 5, 4);
            this.tableLayoutPanel1.Controls.Add(this.btnSave, 2, 4);
            this.tableLayoutPanel1.Controls.Add(this.btnCancel, 1, 4);
            this.tableLayoutPanel1.Controls.Add(this.btnGIDel, 0, 4);
            this.tableLayoutPanel1.Controls.Add(this.txtSN, 1, 2);
            this.tableLayoutPanel1.Controls.Add(this.lblCNTRDate, 4, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnSet, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.lblUsername, 5, 0);
            this.tableLayoutPanel1.Controls.Add(this.label2, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.btnPreCancel, 5, 2);
            this.tableLayoutPanel1.Controls.Add(this.lblGIstock, 1, 0);
            this.tableLayoutPanel1.Controls.Add(this.txtCNTR, 1, 1);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 5;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 67F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 67F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 67F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 97F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(1280, 1024);
            this.tableLayoutPanel1.TabIndex = 2;
            this.tableLayoutPanel1.Paint += new System.Windows.Forms.PaintEventHandler(this.tableLayoutPanel1_Paint);
            // 
            // grdGI
            // 
            this.grdGI.AllowUserToAddRows = false;
            this.grdGI.AllowUserToResizeRows = false;
            this.grdGI.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdGI.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.grdGI.CellBorderStyle = System.Windows.Forms.DataGridViewCellBorderStyle.None;
            this.grdGI.ColumnHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle4.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGI.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle4;
            this.grdGI.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.tableLayoutPanel1.SetColumnSpan(this.grdGI, 6);
            this.grdGI.Data = null;
            dataGridViewCellStyle5.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle5.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle5.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle5.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(136)))), ((int)(((byte)(136)))), ((int)(((byte)(136)))));
            dataGridViewCellStyle5.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle5.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle5.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.grdGI.DefaultCellStyle = dataGridViewCellStyle5;
            this.grdGI.Dock = System.Windows.Forms.DockStyle.Fill;
            this.grdGI.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnKeystroke;
            this.grdGI.EnableHeadersVisualStyles = false;
            this.grdGI.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            this.grdGI.GridColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.grdGI.LanguageCategory = null;
            this.grdGI.LanguageCode = null;
            this.grdGI.Location = new System.Drawing.Point(2, 209);
            this.grdGI.Margin = new System.Windows.Forms.Padding(0);
            this.grdGI.Name = "grdGI";
            this.grdGI.RowHeadersBorderStyle = System.Windows.Forms.DataGridViewHeaderBorderStyle.None;
            dataGridViewCellStyle6.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle6.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.Font = new System.Drawing.Font("Segoe UI", 11F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Pixel);
            dataGridViewCellStyle6.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            dataGridViewCellStyle6.SelectionBackColor = System.Drawing.Color.FromArgb(((int)(((byte)(0)))), ((int)(((byte)(174)))), ((int)(((byte)(219)))));
            dataGridViewCellStyle6.SelectionForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(17)))), ((int)(((byte)(17)))), ((int)(((byte)(17)))));
            dataGridViewCellStyle6.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.grdGI.RowHeadersDefaultCellStyle = dataGridViewCellStyle6;
            this.grdGI.RowHeadersVisible = false;
            this.grdGI.RowHeadersWidthSizeMode = System.Windows.Forms.DataGridViewRowHeadersWidthSizeMode.DisableResizing;
            this.grdGI.RowTemplate.Height = 23;
            this.grdGI.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
            this.grdGI.Size = new System.Drawing.Size(1276, 714);
            this.grdGI.TabIndex = 11;
            this.grdGI.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.grdGI_CellClick);
            this.grdGI.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.grdGI_CellContentClick);
            // 
            // lblGIstock
            // 
            this.tableLayoutPanel1.SetColumnSpan(this.lblGIstock, 4);
            this.lblGIstock.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lblGIstock.Font = new System.Drawing.Font("맑은 고딕", 20.25F, System.Drawing.FontStyle.Bold);
            this.lblGIstock.Location = new System.Drawing.Point(250, 3);
            this.lblGIstock.Margin = new System.Windows.Forms.Padding(1);
            this.lblGIstock.Name = "lblGIstock";
            this.lblGIstock.Size = new System.Drawing.Size(820, 65);
            this.lblGIstock.TabIndex = 9;
            this.lblGIstock.Text = "출하창고";
            this.lblGIstock.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            this.lblGIstock.Click += new System.EventHandler(this.lblGIstock_Click);
            // 
            // frmProductGI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1280, 1024);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Name = "frmProductGI";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
            this.Text = "3";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.tableLayoutPanel1.ResumeLayout(false);
            this.tableLayoutPanel1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.grdGI)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private System.Windows.Forms.Button btnGIDel;
        private System.Windows.Forms.Button btnCancel;
        private System.Windows.Forms.Button btnClose;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.Label lblMessage;
        private System.Windows.Forms.TextBox txtSN;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label lblUsername;
        private System.Windows.Forms.Label lblCNTRDate;
        private System.Windows.Forms.TextBox txtCNTR;
        private System.Windows.Forms.Button btnPreCancel;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
        private System.Windows.Forms.Button btnSet;
        private SmartMom_Lib.ExGrid grdGI;
        private System.Windows.Forms.Label lblGIstock;
    }
}