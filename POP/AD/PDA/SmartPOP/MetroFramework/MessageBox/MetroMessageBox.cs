using System;
using System.Collections.Generic;
using System.Drawing;
using System.Media;
using System.Text;
using System.Threading;
using System.Windows.Forms;
using MetroFramework.Forms;
using MetroFramework.Interfaces;

namespace MetroFramework
{
    /// <summary>
    /// Metro-styled message notification.
    /// </summary>
    public static class MetroMessageBox
    {
        private const int defaultHeight = 211;

        /// <summary>
        /// Shows a metro-styles message notification into the specified owner window.
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="message"></param>
        /// <param name="height" optional=211></param>
        /// <returns></returns>
        public static DialogResult Show(IWin32Window owner, String message, int height = defaultHeight)
        { return Show(owner, message, "Notification", height); }

        /// <summary>
        /// Shows a metro-styles message notification into the specified owner window.
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        /// <param name="height" optional=211></param>
        /// <returns></returns>
        public static DialogResult Show(IWin32Window owner, String message, String title, int height = defaultHeight)
        { return Show(owner, message, title, MessageBoxButtons.OK, height); }

        /// <summary>
        /// Shows a metro-styles message notification into the specified owner window.
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        /// <param name="buttons"></param>
        /// <param name="height" optional=211></param>
        /// <returns></returns>
        public static DialogResult Show(IWin32Window owner, String message, String title, MessageBoxButtons buttons, int height = defaultHeight)
        { return Show(owner, message, title, buttons, MessageBoxIcon.None, height); }

        /// <summary>
        /// Shows a metro-styles message notification into the specified owner window.
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        /// <param name="buttons"></param>
        /// <param name="icon"></param>
        /// <param name="height" optional=211></param>
        /// <returns></returns>
        public static DialogResult Show(IWin32Window owner, String message, String title, MessageBoxButtons buttons, MessageBoxIcon icon, int height = defaultHeight)
        {
            string refstring= null;
            return Show(owner, message, title, buttons, icon, MessageBoxDefaultButton.Button1, ref refstring, height); 
        }

        /// <summary>
        /// Shows a metro-styles message notification into the specified owner window.
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        /// <param name="buttons"></param>
        /// <param name="icon"></param>
        /// <param name="height" optional=211></param>
        /// <returns></returns>
        public static DialogResult Show(IWin32Window owner, String message, String title, MessageBoxButtons buttons, MessageBoxIcon icon, MessageBoxDefaultButton defaultbutton, int height = defaultHeight)
        {
            string refstring = null;
            return Show(owner, message, title, buttons, icon, defaultbutton, ref refstring, height);
        }

        /// <summary>
        /// Shows a metro-styles message notification into the specified owner window.
        /// </summary>
        /// <param name="owner"></param>
        /// <param name="message"></param>
        /// <param name="title"></param>
        /// <param name="buttons"></param>
        /// <param name="icon"></param>
        /// <param name="defaultbutton"></param>
        /// <param name="height" optional=211></param>
        /// <returns></returns>
        public static DialogResult Show(IWin32Window owner, String message, String title, MessageBoxButtons buttons, MessageBoxIcon icon, MessageBoxDefaultButton defaultbutton, ref string inputValue, int height = defaultHeight)
        {
            DialogResult _result = DialogResult.None;

            if (owner != null)
            {
                Form _owner = (owner as Form == null) ? ((UserControl)owner).ParentForm : (Form)owner;
                
                //int _minWidth = 500;
                //int _minHeight = 350;

                //if (_owner.Size.Width < _minWidth ||
                //    _owner.Size.Height < _minHeight)
                //{
                //    if (_owner.Size.Width < _minWidth && _owner.Size.Height < _minHeight) {
                //            _owner.Size = new Size(_minWidth, _minHeight);
                //    }
                //    else
                //    {
                //        if (_owner.Size.Width < _minWidth) _owner.Size = new Size(_minWidth, _owner.Size.Height);
                //        else _owner.Size = new Size(_owner.Size.Width, _minHeight);
                //    }

                //    int x = Convert.ToInt32(Math.Ceiling((decimal)(Screen.PrimaryScreen.WorkingArea.Size.Width / 2) - (_owner.Size.Width / 2)));
                //    int y = Convert.ToInt32(Math.Ceiling((decimal)(Screen.PrimaryScreen.WorkingArea.Size.Height / 2) - (_owner.Size.Height / 2)));
                //    _owner.Location = new Point(x, y);
                //}

                switch (icon)
                {
                    case MessageBoxIcon.Error:
                        SystemSounds.Hand.Play(); break;
                    case MessageBoxIcon.Exclamation:
                        SystemSounds.Exclamation.Play(); break;
                    case MessageBoxIcon.Question:
                        SystemSounds.Beep.Play(); break;
                    default:
                        SystemSounds.Asterisk.Play(); break;
                }

                MetroMessageBoxControl _control = new MetroMessageBoxControl();
                _control.BackColor = _owner.BackColor;
                _control.Properties.Buttons = buttons;
                _control.Properties.DefaultButton = defaultbutton;
                _control.Properties.Icon = icon;
                _control.Properties.Message = message;
                _control.Properties.Title = title;
                _control.Padding = new Padding(0, 0, 0, 0);
                _control.ControlBox = false;
                _control.ShowInTaskbar = false;                
                //_owner.Controls.Add(_control);
                //if (_owner is IMOMForm)
                //{
                //    //if (((MOMForm)_owner).DisplayHeader)
                //    //{
                //    //    _offset += 30;
                //    //}
                //    _control.Theme = ((MOMForm)_owner).Theme;
                //    _control.Style = ((MOMForm)_owner).Style;
                //}

                _control.Properties.InputBox = (inputValue != null);

                _control.Size = new Size(_owner.Size.Width, height);
                _control.Location = new Point(_owner.Location.X, _owner.Location.Y + (_owner.Height - _control.Height) / 2);
                _control.ArrangeApperance();
                //int _overlaySizes = Convert.ToInt32(Math.Floor(_control.Size.Height * 0.28));
                //_control.OverlayPanelTop.Size = new Size(_control.Size.Width, _overlaySizes - 30);
                //_control.OverlayPanelBottom.Size = new Size(_control.Size.Width, _overlaySizes);

                _control.ShowDialog();
                //_control.BringToFront();
                //_control.SetFocus();

                Action<MetroMessageBoxControl> _delegate = new Action<MetroMessageBoxControl>(ModalState);
                IAsyncResult _asyncresult = _delegate.BeginInvoke(_control, null, _delegate);
                bool _cancelled = false;

                try
                {
                    while (!_asyncresult.IsCompleted)
                    { Thread.Sleep(1); Application.DoEvents(); }
                }
                catch 
                {
                    _cancelled = true;

                    if (!_asyncresult.IsCompleted)
                    {
                        try { _asyncresult = null; }
                        catch { }
                    }

                    _delegate = null;
                }

                if (!_cancelled)
                {
                    _result = _control.Result;
                    inputValue = _control.InputBoxText;
                    //_owner.Controls.Remove(_control);
                    _control.Dispose(); _control = null;            
                }
                 
            }

            return _result;
        }

        private static void ModalState(MetroMessageBoxControl control)
        {
            while (control.Visible)
            { }
        }

    }
}
