using System;
using System.Drawing;
using Windows.Win32;
using Windows.Win32.Foundation;
using Windows.Win32.UI.WindowsAndMessaging;

namespace MaxViewerPane
{
    internal class Program
    {
        /// <summary>
        /// <list type="bullet">
        ///     <item><description>When a viewer pane is displayed.</description></item>
        ///     <item><description>When a lister with viewer pane is resized.</description></item>
        ///     <item><description>When the layout of a viewer pane is changed.</description></item>
        /// </list>
        /// </summary>
        static void Main(string[] args)
        {
            if (MaxViewerPane(args) is false)
            {
                Console.Error.WriteLine($"Args: {string.Join(" ", args)}");
                Console.ReadKey();
            }
        }

        static bool MaxViewerPane(string[] args)
        {
            if (args.Length < 5)
            {
                Console.Error.WriteLine("Usage: MaxViewerPane.exe <lister title> <left> <top> <right> <bottom>");
                return false;
            }
            var title = args[0];
            int left = int.Parse(args[1]);
            int top = int.Parse(args[2]);
            int right = int.Parse(args[3]) - 1;
            int bottom = int.Parse(args[4]) - 1;

            // TODO: There may be multiple listers with the same title and the same position.
            var lister = PInvoke.FindWindowEx(default, default, "dopus.lister", title);
            /*
            while (lister != default)
            {
                RECT rect;
                // TODO: Why GetWindowRect outputs wrong values?
                if (PInvoke.GetWindowRect(lister, out rect)
                    && rect.left == left && rect.top == top && rect.right == right && rect.bottom == bottom)
                {
                    break;
                }
                lister = PInvoke.FindWindowEx(default, lister, "dopus.lister", title);
            }
            */
            if (lister == default)
            {
                Console.Error.WriteLine("Lister not found.");
                return false;
            }

            var viewerPane = PInvoke.FindWindowEx(lister, default, "dopus.listerviewpane", default);
            if (viewerPane == default)
            {
                Console.Error.WriteLine("Viewer pane not found.");
                return false;
            }

            RECT viewerRect;
            if (PInvoke.GetWindowRect(viewerPane, out viewerRect) == 0)
            {
                Console.Error.WriteLine("Failed to get viewer pane rect.");
                return false;
            }
            // Or MapWindowPoints()
            Point pt = new Point(viewerRect.left, viewerRect.top);
            PInvoke.ScreenToClient(lister, ref pt);
            viewerRect.left = pt.X;
            viewerRect.top = pt.Y;
            pt = new Point(viewerRect.right, viewerRect.bottom);
            PInvoke.ScreenToClient(lister, ref pt);
            viewerRect.right = pt.X;
            viewerRect.bottom = pt.Y;

            if (PInvoke.SetWindowPos(
                viewerPane,
                new HWND((IntPtr)0),  // HWND_TOP
                viewerRect.left,
                0,
                viewerRect.Width,
                viewerRect.Height + viewerRect.top,
                SET_WINDOW_POS_FLAGS.SWP_NOACTIVATE
                ) == 0)
            {
                Console.Error.WriteLine("Failed to set viewer pane pos.");
                return false;
            }

            // TODO: Resize toolbars

            return true;
        }
    }
}