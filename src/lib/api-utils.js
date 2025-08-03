import { createRouter } from 'next-connect';

// ฟังก์ชันสำหรับสร้าง API route แบบง่าย
export function createApiRoute() {
  const router = createRouter({
    onError: (err, req, res) => {
      console.error('API error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    },
    onNoMatch: (req, res) => {
      res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  });

  // สร้าง handler function
  const handler = async (req, res) => router.run(req, res);
  
  // เพิ่ม method shortcuts เหมือน Express
  handler.get = (middleware, controller) => {
    if (typeof middleware === 'function' && typeof controller === 'function') {
      router.get(middleware, controller);
    } else if (typeof middleware === 'function') {
      router.get(middleware);
    }
    return handler;
  };
  
  handler.post = (middleware, controller) => {
    if (typeof middleware === 'function' && typeof controller === 'function') {
      router.post(middleware, controller);
    } else if (typeof middleware === 'function') {
      router.post(middleware);
    }
    return handler;
  };
  
  handler.put = (middleware, controller) => {
    if (typeof middleware === 'function' && typeof controller === 'function') {
      router.put(middleware, controller);
    } else if (typeof middleware === 'function') {
      router.put(middleware);
    }
    return handler;
  };
  
  handler.delete = (middleware, controller) => {
    if (typeof middleware === 'function' && typeof controller === 'function') {
      router.delete(middleware, controller);
    } else if (typeof middleware === 'function') {
      router.delete(middleware);
    }
    return handler;
  };
  
  handler.use = (middleware) => {
    router.use(middleware);
    return handler;
  };
  
  // เพิ่ม method อื่นๆ ตามต้องการ...
  
  return handler;
}